import React from 'react';
import {Tag} from "antd";
import {convertEnumToString} from "../../utils/common";

const JobFairForAdminColumn = (getColumnSearchProps) => {
  return [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      ...getColumnSearchProps('no')
    },
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
      title: 'Attendant register start time',
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
          text: 'Closed',
          value: 'CLOSED'
        },
        {
          text: 'Happening',
          value: 'HAPPENING'
        },
        {
          text: 'Attendant register',
          value: 'ATTENDANT_REGISTER'
        },
        {
          text: 'Company buy booth',
          value: 'COMPANY_BUY_BOOTH'
        },
        {
          text: 'Company register',
          value: 'COMPANY_REGISTER'
        },
        {
          text: 'Not yet',
          value: 'NOT_YET'
        },
        {
          text: 'Processing',
          value: 'PROCESSING'
        },
        {
          text: 'Unavailable',
          value: 'UNAVAILABLE'
        },
      ],
      onFilter: (value, record) => {
        return record.status === value
      },
      render: status => {
        let objStatus
        switch (status) {
          default:
            objStatus = {
              color: 'green',
              message: convertEnumToString(status)
            }
            break
        }
        return (
          <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
        )
      }
    }
  ]
};

export default JobFairForAdminColumn;