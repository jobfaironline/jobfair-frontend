import { Tag } from 'antd';
import { convertEnumToString } from '../../../utils/common';
import { handleFilterStatus } from '../../../utils/filterJobFairByStatus';
import React from 'react';

const JobFairForAdminColumn = (getColumnSearchProps, key) => [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    width: '4rem',
    render(text) {
      return {
        props: {
          style: { textAlign: 'end' }
        },
        children: text
      };
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ...getColumnSearchProps('name')
  },
  {
    title: 'Company register',
    children: [
      {
        title: 'Start time',
        dataIndex: 'companyRegisterStartTime',
        key: 'companyRegisterStartTime',
        ...getColumnSearchProps('companyRegisterStartTime')
      },
      {
        title: 'End time',
        dataIndex: 'companyRegisterEndTime',
        key: 'companyRegisterEndTime',
        ...getColumnSearchProps('companyRegisterEndTime')
      }
    ]
  },
  {
    title: 'Attendant register time',
    dataIndex: 'attendantRegisterStartTime',
    key: 'attendantRegisterStartTime',
    ...getColumnSearchProps('attendantRegisterStartTime')
  },
  {
    title: 'Job fair',
    children: [
      {
        title: 'Start time',
        dataIndex: 'startTime',
        key: 'startTime',
        ...getColumnSearchProps('startTime')
      },
      {
        title: 'End time',
        dataIndex: 'endTime',
        key: 'endTime',
        ...getColumnSearchProps('endTime')
      }
    ]
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filters: handleFilterStatus(key),
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let objStatus;
      switch (status) {
        default:
          objStatus = {
            color: 'green',
            message: convertEnumToString(status)
          };
          break;
      }
      return <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>;
    }
  }
];

export default JobFairForAdminColumn;
