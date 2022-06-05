import { Tag, Typography } from 'antd';
import React from 'react';
import { convertEnumToString, convertToUTCString } from '../../utils/common';

const JobFairAssignmentTableColumn = (getColumnSearchProps) => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render(text) {
      return {
        props: {
          style: { width: '3rem', textAlign: 'right' }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: 'Job fair name',
    dataIndex: 'jobFairName',
    key: 'jobFairName',
    ...getColumnSearchProps('jobFairName'),
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ['descend']
  },
  {
    title: 'Assignment type',
    dataIndex: 'assignmentType',
    key: 'assignmentType',
    ...getColumnSearchProps('assignmentType'),
    render: (assignmentType) => (
      <>
        <Tag color={'green'}>{convertEnumToString(assignmentType)}</Tag>
      </>
    )
  },
  {
    title: 'Decorate range time',
    children: [
      {
        title: 'Start time',
        dataIndex: 'decorateStartTime',
        key: 'decorateStartTime',
        ...getColumnSearchProps('decorateStartTime'),
        render: (text, record) => <Typography>{convertToUTCString(record?.decorateStartTime)}</Typography>
      },
      {
        title: 'End time',
        dataIndex: 'decorateEndTime',
        key: 'decorateEndTime',
        ...getColumnSearchProps('decorateEndTime'),
        render: (text, record) => <Typography>{convertToUTCString(record?.decorateEndTime)}</Typography>
      }
    ]
  },
  {
    title: 'Public range time',
    children: [
      {
        title: 'Start time',
        dataIndex: 'publicStartTime',
        key: 'publicStartTime',
        ...getColumnSearchProps('publicStartTime'),
        render: (text, record) => <Typography>{convertToUTCString(record?.publicStartTime)}</Typography>
      },
      {
        title: 'End time',
        dataIndex: 'publicEndTime',
        key: 'publicEndTime',
        ...getColumnSearchProps('publicEndTime'),
        render: (text, record) => <Typography>{convertToUTCString(record?.publicEndTime)}</Typography>
      }
    ]
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <>
        <Tag color={'green'}>{status}</Tag>
      </>
    )
  }
];

export default JobFairAssignmentTableColumn;
