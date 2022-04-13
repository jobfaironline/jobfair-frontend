import { AssigmentType } from '../../constants/AssignmentConst';
import { Modal, Select, Typography, notification } from 'antd';
import { TableTransfer } from '../../components/commons/TableTransfer/TableTransfer.component';
import {
  assignEmployee,
  getAssigmentByJobFairBoothId,
  getAvailableCompanyEmployee,
  unAssignEmployee
} from '../../services/jobhub-api/AssignmentControllerService';
import React, { useEffect, useState } from 'react';

const { Option } = Select;
const { Text } = Typography;

export const AssignEmployeeModalContainer = (props) => {
  const { boothId, handleCancel, jobFairId, setVisible } = props;
  const [state, setState] = useState({
    data: undefined,
    targetKeys: undefined,
    oldAssignedEmployees: undefined
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let availableEmployees = await getAvailableCompanyEmployee(jobFairId).then((response) => response.data);
      availableEmployees = availableEmployees === '' ? [] : availableEmployees;
      availableEmployees = availableEmployees.map((employee) => ({
        ...employee.account,
        fullName: `${employee.account.firstname} ${employee.account.middlename} ${employee.account.lastname}`,
        key: employee.account.id
      }));
      let boothAssigments = await getAssigmentByJobFairBoothId(boothId).then((response) => response.data);
      boothAssigments = boothAssigments === '' ? [] : boothAssigments;
      boothAssigments = boothAssigments.map((assignment) => ({
        ...assignment.companyEmployee.account,
        fullName: `${assignment.companyEmployee.account.firstname} ${assignment.companyEmployee.account.middlename} ${assignment.companyEmployee.account.lastname}`,
        assignmentType: assignment.type,
        key: assignment.companyEmployee.account.id
      }));

      const targetKeys = boothAssigments.map((employee) => employee.id);
      const data = [...availableEmployees, ...boothAssigments];

      setState((prevState) => ({
        ...prevState,
        data,
        targetKeys,
        oldAssignedEmployees: JSON.parse(JSON.stringify(boothAssigments))
      }));
    } catch (e) {
      notification['error']({
        message: `Error happens`,
        description: `There is problem while submitting, try again later`,
        duration: 2
      });
    }
  };

  const leftTableColumns = [
    {
      dataIndex: 'fullName',
      title: 'Name'
    }
  ];
  const rightTableColumns = [
    {
      dataIndex: 'fullName',
      title: 'Name'
    },
    {
      dataIndex: 'assignmentType',
      title: 'type',
      render: (type, record) => {
        const value = AssigmentType.filter((item) => item.name === type)[0];
        return (
          <Select
            defaultValue={value ? value.label : 'Select type'}
            onClick={(event) => event.stopPropagation()}
            onChange={(value) => {
              record.assignmentType = AssigmentType.filter((item) => item.value === value)[0].name;
            }}>
            {AssigmentType.map((item) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        );
      }
    }
  ];

  const onTableTransferChange = (nextTargetKeys) => {
    state.data.forEach((employee) => {
      if (!nextTargetKeys.includes(employee.key)) employee.assignmentType = undefined;
    });
    setState((prevState) => ({ ...prevState, targetKeys: nextTargetKeys }));
  };

  const onOK = async () => {
    const assginedEmployee = state.data.filter((employee) => state.targetKeys.includes(employee.key));
    if (assginedEmployee.length === 0 || assginedEmployee.some((employee) => employee.assignmentType === undefined)) {
      setIsError(true);
      return;
    }

    const unassignedEmployee = state.oldAssignedEmployees.filter(
      (employee) => !assginedEmployee.find((oldEmployee) => oldEmployee.id === employee.id)
    );

    const unassignedPromise = [];
    for (const employee of unassignedEmployee) {
      const promise = unAssignEmployee(employee.id, boothId);
      unassignedPromise.push(promise);
    }
    await Promise.all(unassignedPromise);

    const assignPromise = [];
    for (const employee of assginedEmployee) {
      const promise = assignEmployee(employee.id, boothId, employee.assignmentType);
      assignPromise.push(promise);
    }
    await Promise.all(assignPromise);

    notification['success']({
      message: `Assign success`,
      description: `Assign success`,
      duration: 2
    });

    setVisible(false);
  };

  if (state.data === undefined || state.targetKeys === undefined) return null;

  return (
    <Modal title='Assign Employee' onOk={onOK} onCancel={handleCancel} width={1000} visible={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TableTransfer
          dataSource={state.data}
          targetKeys={state.targetKeys}
          disabled={false}
          showSearch={true}
          onChange={onTableTransferChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
        {isError ? <Text type='danger' style={{fontSize: "1rem", marginTop: "10px"}}>Please assign employee</Text> : null}
      </div>
    </Modal>
  );
};
