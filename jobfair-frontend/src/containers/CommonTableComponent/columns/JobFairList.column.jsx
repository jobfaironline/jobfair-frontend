import { Tag } from 'antd';
import React from 'react';

const JobFairListColumn = (getColumnSearchProps) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ...getColumnSearchProps('name')
  },
  {
    title: 'Company register start time',
    dataIndex: 'companyRegisterStartTime',
    key: 'companyRegisterStartTime',
    ...getColumnSearchProps('companyRegisterStartTime')
  },
  {
    title: 'Attendant register time',
    dataIndex: 'attendantRegisterStartTime',
    key: 'attendantRegisterStartTime',
    ...getColumnSearchProps('attendantRegisterStartTime')
  },
  {
    title: 'Start time',
    dataIndex: 'startTime',
    key: 'startTime',
    ...getColumnSearchProps('startTime')
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Draft',
        value: 'DRAFT'
      },
      {
        text: 'Pending',
        value: 'PENDING'
      },
      {
        text: 'Deleted',
        value: 'DELETED'
      },
      {
        text: 'Cancel',
        value: 'CANCEL'
      },
      {
        text: 'Approved',
        value: 'APPROVE'
      },
      {
        text: 'Rejected',
        value: 'REJECT'
      }
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let objStatus;
      switch (status) {
        case 'APPROVE':
          objStatus = {
            color: 'green',
            message: 'Approved'
          };
          break;
        case 'DRAFT':
          objStatus = {
            color: 'gold',
            message: 'Draft'
          };
          break;
        case 'PENDING':
          objStatus = {
            color: 'blue',
            message: 'Pending'
          };
          break;
        case 'DELETED':
          objStatus = {
            color: 'magenta',
            message: 'Deleted'
          };
          break;
        case 'CANCEL':
          objStatus = {
            color: 'volcano',
            message: 'Cancel'
          };
          break;
        default:
          objStatus = {
            color: 'red',
            message: 'Rejected'
          };
          break;
      }
      return <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>;
    }
  }
];

export default JobFairListColumn;
