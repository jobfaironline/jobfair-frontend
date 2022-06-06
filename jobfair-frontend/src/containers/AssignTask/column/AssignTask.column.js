import { AssignTaskCell } from '../../../components/customized-components/AssignTask/AssignTaskCell.component';
import { Avatar, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const getTableColumns = async (dayRange, handleOpenAssignTaskModal) => {
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
