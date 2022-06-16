import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { Tag, Typography } from 'antd';
import { convertEnumToString, convertToUTCString } from '../../utils/common';
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
    filters: [
      {
        text: JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE,
        value: JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE
      },
      {
        text: JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING,
        value: JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING
      },
      {
        text: JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET,
        value: JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET
      }
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let color;
      switch (status) {
        case JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE:
          color = 'green';
          break;
        case JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING:
          color = 'blue';
          break;
        case JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET:
          color = 'default';
          break;
        default:
          color = 'default';
      }
      return (
        <>
          <Tag color={color}>{status}</Tag>
        </>
      );
    }
  }
];

export default JobFairAssignmentTableColumn;
