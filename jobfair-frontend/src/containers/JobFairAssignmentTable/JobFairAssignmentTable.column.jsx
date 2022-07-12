import { DateFormat } from '../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { Tag, Typography } from 'antd';
import { convertEnumToString } from '../../utils/common';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

const JobFairAssignmentTableColumn = (getColumnSearchProps) => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: '3%',
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
    width: '15%',
    ...getColumnSearchProps('jobFairName'),
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ['descend'],
    render: (text, record) => (
      <a onClick={record.onClickJobFair}>
        <Text>{text}</Text>
        <FontAwesomeIcon icon={faExternalLink} style={{ marginLeft: '5px' }} />
      </a>
    )
  },
  {
    title: 'Assignment type',
    dataIndex: 'assignmentType',
    key: 'assignmentType',
    width: '15%',
    ...getColumnSearchProps('assignmentType'),
    render: (assignmentType) => (
      <>
        <Tag color={'green'}>{convertEnumToString(assignmentType)}</Tag>
      </>
    )
  },
  {
    title: 'Assigner',
    width: '18%',
    key: 'assignerFullName',
    dataIndex: 'assignerFullName',
    ...getColumnSearchProps('assignerFullName')
  },
  {
    title: 'Created',
    width: '10%',
    key: 'createTime',
    dataIndex: 'createTime',
    sorter: (a, b) => a.createTime - b.createTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(DateFormat)}</Text>
  },
  {
    title: 'Deadline',
    width: '10%',
    key: 'dueTime',
    dataIndex: 'dueTime',
    sorter: (a, b) => a.dueTime - b.dueTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(DateFormat)}</Text>
  },
  {
    title: 'Status',
    key: 'status',
    width: '10%',
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
    render: (status, record) => (
      <>
        <Tag color={record.statusColor}>{status}</Tag>
      </>
    )
  }
];

export default JobFairAssignmentTableColumn;
