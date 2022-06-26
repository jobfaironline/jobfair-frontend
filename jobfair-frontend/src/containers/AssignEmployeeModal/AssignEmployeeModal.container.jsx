import { AssigmentType, AssignmentBoothConstraint, AssignmentConst } from '../../constants/AssignmentConst';
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
  const { boothId, handleCancel, jobFairId, handleOk } = props;
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
        assignmentId: assignment.id,
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
      title: 'Name',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    }
  ];
  const rightTableColumns = [
    {
      dataIndex: 'fullName',
      title: 'Name',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      dataIndex: 'assignmentType',
      title: 'Type',
      render: (type, record) => {
        const value = AssigmentType.filter((item) => item.name === type)[0];
        return (
          <Select
            defaultValue={value ? value.label : 'Select type'}
            onClick={(event) => event.stopPropagation()}
            onChange={(value) => {
              record.assignmentType = AssigmentType.filter((item) => item.value === value)[0].name;
            }}>
            {AssigmentType.filter((item) => item.name !== 'INTERVIEWER' && item.name !== 'RECEPTION').map((item) => (
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
    const assginedEmployees = state.data.filter((employee) => state.targetKeys.includes(employee.key));
    //check for not assign anyone or missing assignment type
    if (assginedEmployees.length === 0 || assginedEmployees.some((employee) => employee.assignmentType === undefined)) {
      setIsError(true);
      return;
    }
    //check for required assignment in booth
    const decoratorNum = assginedEmployees.filter(
      (employee) => employee.assignmentType === AssignmentConst.DECORATOR
    ).length;
    const supervisorNum = assginedEmployees.filter(
      (employee) => employee.assignmentType === AssignmentConst.SUPERVISOR
    ).length;
    const staffNum = assginedEmployees.filter((employee) => employee.assignmentType === AssignmentConst.STAFF).length;

    if (
      decoratorNum !== AssignmentBoothConstraint.decoratorNum ||
      supervisorNum !== AssignmentBoothConstraint.supervisorNum ||
      staffNum !== AssignmentBoothConstraint.staffNum
    ) {
      setIsError(true);
      return;
    }

    const unassignedEmployee = state.oldAssignedEmployees.filter(
      (employee) => !assginedEmployees.find((oldEmployee) => oldEmployee.id === employee.id)
    );

    const unassignedPromise = [];
    for (const employee of unassignedEmployee) {
      const promise = unAssignEmployee(employee.assignmentId);
      unassignedPromise.push(promise);
    }
    await Promise.all(unassignedPromise);

    const assignPromise = [];
    for (const employee of assginedEmployees) {
      const promise = assignEmployee(employee.id, boothId, employee.assignmentType);
      assignPromise.push(promise);
    }
    await Promise.all(assignPromise);

    notification['success']({
      message: `Assign successfully`,
      duration: 2
    });

    handleOk();
  };

  if (state.data === undefined || state.targetKeys === undefined) return null;

  return (
    <Modal title='Assign Employee' onOk={onOK} onCancel={handleCancel} width={1000} visible={true} centered={true}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <TableTransfer
          titles={[<Text level={3}>Available employee</Text>, <Text level={3}>Assigned employee</Text>]}
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
        {isError ? (
          <Text type='danger' style={{ fontSize: '1rem', marginTop: '10px' }}>
            Please assign 1 supervisor, 1 decorator, at least 2 staffs for this booth
          </Text>
        ) : null}
      </div>
    </Modal>
  );
};
