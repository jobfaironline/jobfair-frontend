import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const BoothAssignmentDetail = (props) => {
  const { data } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <Title level={5}>
          {`Slot name: ${data.booth.name}`}
          <br />
          {data.name ? `Booth name - ${data.name}` : ''}
        </Title>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text strong>Supervisor: </Text>
        {data.assignments
          .filter((assign) => assign.type === AssignmentConst.SUPERVISOR)
          .map((assign) => (
            <Text>
              {'- '}
              {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
              {assign.companyEmployee.account.lastname}
            </Text>
          ))}
        <Text strong>Staff:</Text>
        {data.assignments
          .filter((assign) => assign.type === AssignmentConst.STAFF)
          .map((assign) => (
            <Text>
              {'- '}
              {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
              {assign.companyEmployee.account.lastname}
            </Text>
          ))}
        <Text strong>Decorator: </Text>
        {data.assignments
          .filter((assign) => assign.type === AssignmentConst.DECORATOR)
          .map((assign) => (
            <Text>
              {'- '}
              {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
              {assign.companyEmployee.account.lastname}
            </Text>
          ))}
      </div>
    </div>
  );
};
