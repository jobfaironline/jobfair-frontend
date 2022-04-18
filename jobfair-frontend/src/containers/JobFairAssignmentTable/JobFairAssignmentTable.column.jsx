import { Tag } from 'antd';
import React from 'react';

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
    ...getColumnSearchProps('assignmentType')
  },
  {
    title: 'Decorate range time',
    children: [
      {
        title: 'Start time',
        dataIndex: 'decorateStartTime',
        key: 'decorateStartTime',
        ...getColumnSearchProps('decorateStartTime')
      },
      {
        title: 'End time',
        dataIndex: 'decorateEndTime',
        key: 'decorateEndTime',
        ...getColumnSearchProps('decorateEndTime')
      }
    ]
  },
  {
    title: 'Public range time',
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
    render: (status) => (
      <>
        <Tag color={'green'}>{status}</Tag>
      </>
    )
  }
];

export default JobFairAssignmentTableColumn;
