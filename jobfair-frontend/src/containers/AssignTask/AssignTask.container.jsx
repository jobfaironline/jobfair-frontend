import './AssignTask.styles.scss';

import { AssignTaskCell } from '../../components/customized-components/AssignTask/AssignTaskCell.component';
import { AssignTaskModal } from '../../components/forms/AssignTaskModalForm/AsignTaskModalForm.component';
import { AssignmentConst } from '../../constants/AssignmentConst';
import { Avatar, Badge, Button, Checkbox, Form, Input, Space, Table, Typography, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import {
  assignEmployee,
  getAssigmentByJobFairBoothId,
  unAssignEmployee,
  updateAssignment
} from '../../services/jobhub-api/AssignmentControllerService';
import { deepClone } from '../../utils/common';
import { getCompanyBoothById } from '../../services/jobhub-api/JobFairBoothControllerService';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { Text } = Typography;

const TaskFilterPanel = (props) => {
  const { onFilter, onReset } = props;
  return (
    <div style={{ padding: '0 1rem 0 0', marginRight: '2rem' }}>
      <Form
        onFinish={onFilter}
        onReset={() => {
          onReset();
        }}
        initialValues={{
          searchValue: '',
          filter: []
        }}>
        <Typography.Title level={4}>Filter</Typography.Title>
        <Typography.Title level={5}>Name</Typography.Title>
        <Form.Item name={'searchValue'}>
          <Input.Search placeholder={"Employee's name"} />
        </Form.Item>
        <Typography.Title level={5}>Role</Typography.Title>
        <Form.Item name={'filter'}>
          <Checkbox.Group>
            <Checkbox value={AssignmentConst.RECEPTION}>
              <Badge color={'#dfdf149e'} text={'RECEPTION'} />
            </Checkbox>
            <br />
            <Checkbox value={AssignmentConst.INTERVIEWER}>
              <Badge color={'#02fd02'} text={'INTERVIEWER'} />
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <div style={{ marginTop: '1rem', display: 'flex' }}>
          <Button style={{ marginLeft: 'auto', marginRight: '1rem' }} htmlType={'reset'}>
            Reset
          </Button>
          <Button type={'primary'} htmlType={'submit'}>
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

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
      const shiftData = [
        { beginTime: 32400000, endTime: 43200000 },
        { beginTime: 45000000, endTime: 61200000 }
      ];

      let res = await getAssigmentByJobFairBoothId(boothId);
      const assignments = res.data;
      const staffAssignments = await getStaffAssignments(assignments, shiftData);
      const staffs = await getStaffList(assignments);
      res = await getCompanyBoothById(boothId);
      const jobFairBooth = res.data;
      const jobFairInfo = res.data.jobFair;
      const dayRange = await getJobFairPublicDayRange(jobFairInfo);
      const dataSource = await getDataSource(staffAssignments, staffs, dayRange, shiftData);
      const columns = await getTableColumns(dayRange);

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

  const getTableColumns = async (dayRange) => {
    //generate table columns based on dayRange
    const columns = [
      {
        title: 'Employee',
        key: 'employee',
        width: '30%',
        render: (_, record) => {
          const { profileImageUrl } = record.employee.account;
          return (
            <div>
              <Space>
                <Avatar src={profileImageUrl} size={56} />
                <Text>{record.fullName}</Text>
              </Space>
            </div>
          );
        }
      }
    ];
    for (const title of Object.keys(dayRange)) {
      columns.push({
        title,
        width: `${70 / Object.keys(dayRange).length}%`,
        dataIndex: title,
        render: (_, record) => (
          <AssignTaskCell record={record} title={title} handleOpenAssignTaskModal={handleOpenAssignTaskModal} />
        )
      });
    }
    return columns;
  };

  //process to calculate datasource for table
  //each row of the datasource comprise of employeeId, employee's info, assignments by date
  //Ex: [
  //  {
  //    employeeId: "f996f062-c1d5-4fcc-a13c-8cae1e210d0d",
  //    employee: {accountId: ....},
  //    'Sat, Jun/4/2022': [{assignment1, assignment2}],
  //    'Sun, Jun/5/2022': [{assignment1, assignment2}],
  //  }
  // ]
  const getDataSource = async (staffAssignments, staffs, dayRange, shiftData) => {
    const dataSource = [];

    for (const [key, value] of Object.entries(staffAssignments)) {
      const result = {
        employeeId: key,
        employee: staffs[key]
      };
      for (const title of Object.keys(dayRange)) result[title] = [];
      for (const [title, time] of Object.entries(dayRange)) {
        const { beginTime, endTime } = time;
        for (const assignment of value) {
          if (assignment.beginTime >= beginTime.valueOf() && assignment.endTime <= endTime.valueOf())
            result[title].push(assignment);
        }
      }
      dataSource.push(result);
    }
    //check for the remaining staffs if they have not yet assigned
    for (const staffId of Object.keys(staffs)) {
      const existedData = dataSource.find((data) => data.employeeId === staffId);
      if (existedData === undefined) {
        const data = {
          employeeId: staffId,
          employee: staffs[staffId]
        };
        for (const title of Object.keys(dayRange)) data[title] = [];
        dataSource.push(data);
      }
    }
    return dataSource
      .map((item) => {
        const { firstname, middlename, lastname } = item.employee.account;
        const fullName = `${firstname} ${middlename ? `${middlename} ` : ''} ${lastname}`;
        return { ...item, fullName, key: item.employee.account.id, shiftData, enabled: true };
      })
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  };

  //calculate the job fair public day range
  //dayRange is the map with key is the string format of a moment and its start of day and end of day
  //Ex: {Sat, Jun/4/2022: {beginTime: Moment, endTime: Moment}}
  const getJobFairPublicDayRange = async (jobFairInfo) => {
    const publicStartTime = moment(jobFairInfo.publicStartTime);
    const publicEndTime = moment(jobFairInfo.publicEndTime);
    let dayRange = [];
    const diff = publicEndTime.diff(publicStartTime, 'days');
    const publicStartBeginTime = publicStartTime.clone().startOf('day');
    for (let i = 0; i <= diff; i++) {
      publicStartBeginTime.add(i, 'days');
      dayRange.push(publicStartBeginTime.clone());
    }
    dayRange = dayRange.reduce((prev, current) => {
      const title = current.format('ddd, MMM/D/YYYY');
      prev[title] = { beginTime: current.clone(), endTime: current.clone().endOf('day') };
      return prev;
    }, {});
    return dayRange;
  };

  //get employee information and store in map with key is employeeId
  //Ex: {123: {accountId:....}}
  const getStaffList = async (assignments) => {
    const staffAssignments = assignments.filter((assignment) =>
      [AssignmentConst.STAFF, AssignmentConst.INTERVIEWER, AssignmentConst.RECEPTION].includes(assignment.type)
    );
    return staffAssignments
      .map((assignment) => assignment.companyEmployee)
      .reduce((prev, employee) => {
        prev[employee.accountId] = employee;
        return prev;
      }, {});
  };

  //transform staffAssignments from list of assignment to map of assignments based on employeeId
  //Ex: {3128aa05-fafa-4790-a8dd-219b6741f9d4: [{assignment1}, {assignment2}]
  const getStaffAssignments = async (assignments, shiftData) => {
    //get staff assignments
    let staffAssignments = assignments.filter((assignment) =>
      [AssignmentConst.STAFF, AssignmentConst.INTERVIEWER, AssignmentConst.RECEPTION].includes(assignment.type)
    );
    //transform staffAssignments from list of assignment to map of assignments based on employeeId
    //Ex: {3128aa05-fafa-4790-a8dd-219b6741f9d4: [{assignment1}, {assignment2}]
    staffAssignments = staffAssignments.reduce((prev, current) => {
      const employeeId = current.companyEmployee.accountId;
      if (prev[employeeId] === undefined) prev[employeeId] = [];
      current.shift = undefined;
      const { beginTime, endTime } = current;
      if (beginTime !== undefined && beginTime !== null) {
        const startOfDate = moment(beginTime).startOf('day');

        for (let i = 0; i < shiftData.length; i++) {
          if (
            beginTime - startOfDate.valueOf() >= shiftData[i].beginTime &&
            endTime - startOfDate.valueOf() <= shiftData[i].endTime
          ) {
            current.shift = i;
            break;
          }
        }
      }

      prev[employeeId].push(current);
      return prev;
    }, {});

    return staffAssignments;
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
            const result = {
              beginTime: tableData.dayRange[selectedCellData.date].beginTime.valueOf() + shiftData[i].beginTime,
              endTime: tableData.dayRange[selectedCellData.date].beginTime.valueOf() + shiftData[i].endTime,
              companyEmployee: data.employee,
              creatTime: null,
              id: null,
              jobFairBooth: null,
              shift: i,
              type: values[`shift-${i}-type`]
            };
            assignments.push(result);
          }
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
    //compare oldDataSource and newDataSource
    const newAssignments = [];
    const deletedAssignments = [];
    const updatedAssignmens = [];

    for (let i = 0; i < tableData.oldDataSource.length; i++) {
      const oldData = tableData.oldDataSource[i];
      const newData = tableData.dataSource[i];
      const dayRange = tableData.dayRange;
      for (const date of Object.keys(dayRange)) {
        //find new or updated assignment
        for (const newAssignment of newData[date]) {
          if (newAssignment.id === null) {
            newAssignments.push(newAssignment);
            break;
          }
          const oldAssigment = oldData[date].find((assignment) => assignment.id === newAssignment.id);
          if (
            oldAssigment.type !== newAssignment.type ||
            oldAssigment.beginTime !== newAssignment.beginTime ||
            oldAssigment.endTime !== newAssignment.endTime
          ) {
            updatedAssignmens.push(newAssignment);
            break;
          }
        }
        //find deleted assignment
        for (const oldAssigment of oldData[date]) {
          const index = newData[date].findIndex((assignment) => assignment.id === oldAssigment.id);
          if (index === -1) deletedAssignments.push(oldAssigment);
        }
      }
    }

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
      ...updatedAssignmens.map(async (assignment) =>
        updateAssignment(assignment.id, assignment.beginTime, assignment.endTime)
      )
    );
    try {
      await Promise.all(promises);
      setForceRerender((prevState) => !prevState);
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
            Save schedule
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
            leftSide={<TaskFilterPanel onFilter={onFilterData} onReset={onResetFilter} />}
            isOrganizeJobFair={false}
            ratio={1 / 6}
          />
        )}
      </div>
    </>
  );
};
export default AssignTaskContainer;
