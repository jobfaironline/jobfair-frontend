import './AssignTask.styles.scss';
import { AssignTaskFilterPanel } from '../../components/customized-components/AssignTask/AssignTaskFilterPanel.component';
import { AssignTaskModal } from '../../components/forms/AssignTaskModalForm/AsignTaskModalForm.component';
import { Button, Form, Table, Typography, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import {
  assignEmployee,
  getAssigmentByJobFairBoothId,
  unAssignEmployee,
  updateAssignment
} from '../../services/jobhub-api/AssignmentControllerService';
import { deepClone } from '../../utils/common';
import { getAssignmentsData } from './utils/assign-task-utils';
import { getCompanyBoothById } from '../../services/jobhub-api/JobFairBoothControllerService';
import { getDataSource, getJobFairPublicDayRange, getStaffAssignments, getStaffList } from './utils/datasource-utils';
import { getTableColumns } from './column/AssignTask.column';
import React, { useEffect, useState } from 'react';

const generateAssignment = (data, shiftData, shiftIndex, assignmentType, dayRange, selectedCellData) => ({
  beginTime: dayRange[selectedCellData.date].beginTime.valueOf() + shiftData[shiftIndex].beginTime,
  endTime: dayRange[selectedCellData.date].beginTime.valueOf() + shiftData[shiftIndex].endTime,
  companyEmployee: data.employee,
  creatTime: null,
  id: null,
  jobFairBooth: null,
  shift: shiftIndex,
  type: assignmentType
});

const AssignTaskContainer = (props) => {
  const { boothId } = props;
  const [tableData, setTableData] = useState({
    oldDataSource: undefined,
    dataSource: undefined,
    columns: undefined,
    dayRange: undefined
  });
  const [shiftData, setShiftData] = useState([]);
  const [boothData, setBoothData] = useState(undefined);
  const [selectedCellData, setSelectedCellData] = useState({
    date: undefined,
    employee: undefined,
    visible: false,
    fullName: undefined,
    assignments: undefined
  });
  const [hasChange, setHasChange] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [forceRerender]);

  const fetchData = async () => {
    try {
      let res = await getCompanyBoothById(boothId);
      const jobFairBooth = res.data;
      const jobFairInfo = res.data.jobFair;
      const shiftData = jobFairInfo.shifts.sort((a, b) => a.beginTime - b.beginTime);
      res = await getAssigmentByJobFairBoothId(boothId);
      const assignments = res.data;
      const staffAssignments = await getStaffAssignments(assignments, shiftData);
      const staffs = await getStaffList(assignments);
      const dayRange = await getJobFairPublicDayRange(jobFairInfo);
      const dataSource = await getDataSource(staffAssignments, staffs, dayRange, shiftData);
      const columns = getTableColumns(dayRange, handleOpenAssignTaskModal);

      setTableData((prevState) => ({
        ...prevState,
        dataSource,
        columns,
        oldDataSource: deepClone(dataSource),
        dayRange
      }));
      setBoothData(jobFairBooth);
      setShiftData(shiftData);
    } catch (e) {
      notification['error']({
        message: 'Error when get employee data'
      });
    }
  };

  const onCancelModal = () => {
    form.resetFields();
    setSelectedCellData((prevState) => ({
      ...prevState,
      visible: false,
      date: undefined,
      employee: undefined,
      assignments: undefined,
      fullName: undefined
    }));
  };

  const onOkModal = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);
      const data = tableData.dataSource.find((item) => item.employeeId === selectedCellData.employee.accountId);
      const assignments = data[selectedCellData.date];
      for (let i = 0; i < shiftData.length; i++) {
        if (values[`shift-${i}`] === true) {
          const assignment = assignments.find((assignment) => assignment.shift === i);
          if (assignment === undefined) {
            const result = generateAssignment(
              data,
              shiftData,
              i,
              values[`shift-${i}-type`],
              tableData.dayRange,
              selectedCellData
            );
            assignments.push(result);
          } else assignment.type = values[`shift-${i}-type`];
        } else {
          const index = assignments.findIndex((assignment) => assignment.shift === i);
          if (index !== -1) assignments.splice(index, 1);
        }
      }

      setHasChange(true);
      setTableData((prevState) => ({ ...prevState, dataSource: deepClone(tableData.dataSource) }));
      onCancelModal();
    } catch (e) {
      //ignore form error
    }
  };

  const handleOpenAssignTaskModal = (record, title) => {
    const initialValue = {};
    record[title].forEach((assignment) => {
      initialValue[`shift-${assignment.shift}`] = true;
      initialValue[`shift-${assignment.shift}-type`] = assignment.type;
    });
    form.setFieldsValue(initialValue);

    setSelectedCellData((prevState) => ({
      ...prevState,
      visible: true,
      fullName: record.fullName,
      date: title,
      employee: record.employee,
      assignments: record[title]
    }));
  };

  const onRemoveChange = () => {
    setHasChange(false);
    setTableData((prevState) => ({
      ...prevState,
      dataSource: [...tableData.oldDataSource].map((item) => ({ ...item }))
    }));
  };

  const onSaveChange = async () => {
    const oldData = tableData.oldDataSource;
    const newData = tableData.dataSource;
    const dayRange = tableData.dayRange;
    const [newAssignments, deletedAssignments, updatedAssignments] = getAssignmentsData(oldData, newData, dayRange);

    const promises = [];
    promises.push(
      ...newAssignments.map((assignment) =>
        assignEmployee(
          assignment.companyEmployee.accountId,
          boothData.id,
          assignment.type,
          assignment.beginTime,
          assignment.endTime
        )
      )
    );
    promises.push(...deletedAssignments.map((assignment) => unAssignEmployee(assignment.id)));
    promises.push(
      ...updatedAssignments.map((assignment) =>
        updateAssignment(assignment.id, assignment.beginTime, assignment.endTime, assignment.type)
      )
    );
    try {
      await Promise.all(promises);
      setForceRerender((prevState) => !prevState);
      setHasChange(false);
    } catch (e) {
      notification['error']({
        message: `Error occurred: ${e.response.data.message}`
      });
    }
  };

  const onFilterData = (values) => {
    const { searchValue, filter } = values;
    const dataSource = tableData.dataSource.map((item) => {
      const assignments = [];
      for (const date of Object.keys(tableData.dayRange)) assignments.push(...item[date]);
      const isHasRole = assignments.some((assignment) => filter.includes(assignment.type));
      let isHasName = true;
      if (searchValue !== '' && searchValue !== undefined) isHasName = item.fullName.includes(searchValue);
      let enabled = false;
      if (searchValue === '' || searchValue === undefined) enabled = isHasRole;
      else enabled = isHasRole && isHasName;
      return { ...item, enabled };
    });
    setTableData((prevState) => ({ ...prevState, dataSource: deepClone(dataSource) }));
  };

  const onResetFilter = () => {
    const dataSource = tableData.dataSource.map((item) => ({ ...item, enabled: true }));
    setTableData((prevState) => ({ ...prevState, dataSource: deepClone(dataSource) }));
  };

  const modalProps = {
    date: selectedCellData.date,
    visible: selectedCellData.visible,
    fullName: selectedCellData.fullName,
    form,
    onCancel: onCancelModal,
    onOk: onOkModal,
    shiftData
  };

  return (
    <>
      <AssignTaskModal {...modalProps} />
      <div className={'assign-task-container'}>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <Typography.Title level={3}>Assign task</Typography.Title>
          <Button
            style={{ marginLeft: 'auto', display: hasChange ? 'block' : 'none', marginRight: '1rem' }}
            className={'button'}
            onClick={onRemoveChange}>
            Remove change
          </Button>
          <Button
            className={'button'}
            disabled={!hasChange}
            type={'primary'}
            onClick={onSaveChange}
            style={{ marginLeft: hasChange ? '1rem' : 'auto' }}>
            Save new schedule
          </Button>
        </div>
        {tableData.dataSource === undefined ? (
          <LoadingComponent isWholePage={true} />
        ) : (
          <SideBarComponent
            rightSide={
              <div style={{ marginLeft: '2rem' }}>
                <Table
                  dataSource={[...tableData.dataSource]}
                  columns={[...tableData.columns]}
                  pagination={false}
                  rowClassName={(record) => !record.enabled && 'disabled-row'}
                />
              </div>
            }
            leftSide={<AssignTaskFilterPanel onFilter={onFilterData} onReset={onResetFilter} />}
            isOrganizeJobFair={false}
            ratio={1 / 6}
          />
        )}
      </div>
    </>
  );
};
export default AssignTaskContainer;
