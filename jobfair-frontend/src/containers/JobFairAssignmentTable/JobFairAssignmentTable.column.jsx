import { Button, Tag, Typography } from 'antd';
import { CustomDateFormat, DateFormat } from '../../constants/ApplicationConst';
import { EyeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { convertEnumToString } from '../../utils/common';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

export const JobFairAllAssignmentColumn = (getColumnSearchProps) => [
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
  },
  {
    title: 'Start time',
    width: '10%',
    key: 'startTime',
    dataIndex: 'startTime',
    sorter: (a, b) => a.startTime - b.startTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(DateFormat)}</Text>
  },
  {
    title: 'End time',
    width: '10%',
    key: 'endTime',
    dataIndex: 'endTime',
    sorter: (a, b) => a.endTime - b.endTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(DateFormat)}</Text>
  },
  {
    title: 'Assignments',
    key: 'assignments',
    width: '47%',
    render: (_, record) => {
      const booths = [];
      record.assignments?.forEach((assignment) => {
        if (!booths.includes(assignment.jobFairBooth.id)) booths.push(assignment.jobFairBooth.id);
      });

      return (
        <Text>
          You has <Text strong={true}>{record.assignments?.length ?? 0} </Text>assignment(s) at{' '}
          <Text strong={true}>{booths.length}</Text> booth(s).
        </Text>
      );
    }
  },
  {
    title: 'Details',
    width: '5%',
    render: (_, record) => (
      <Button type={'link'} onClick={record.onClickDetail}>
        <EyeOutlined />
      </Button>
    )
  }
];

export const JobFairAssignmentDetailTableColumn = (getColumnSearchProps) => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: '3%',
    render(text) {
      return {
        props: {
          style: { textAlign: 'right' }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: 'Booth name',
    render: (_, record) => record.jobFairBooth.name ?? 'Untitled',
    width: '15%'
  },
  {
    title: 'Assignment type',
    dataIndex: 'assignmentType',
    key: 'assignmentType',
    width: '10%',
    ...getColumnSearchProps('assignmentType'),
    render: (assignmentType) => (
      <>
        <Tag color={'green'}>{convertEnumToString(assignmentType)}</Tag>
      </>
    )
  },
  {
    title: 'Assigner',
    width: '15%',
    key: 'assignerFullName',
    dataIndex: 'assignerFullName',
    ...getColumnSearchProps('assignerFullName')
  },
  {
    title: 'Created',
    width: '15%',
    key: 'createTime',
    dataIndex: 'createTime',
    sorter: (a, b) => a.createTime - b.createTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(CustomDateFormat)}</Text>
  },
  {
    title: 'Begin time',
    width: '15%',
    key: 'beginTime',
    dataIndex: 'beginTime',
    sorter: (a, b) => a.beginTime - b.beginTime,
    render: (text) => <Text>{moment(text).format(CustomDateFormat)}</Text>
  },
  {
    title: 'Deadline',
    width: '15%',
    key: 'dueTime',
    dataIndex: 'endTime',
    sorter: (a, b) => a.endTime - b.endTime,
    render: (text) => <Text>{moment(text).format(CustomDateFormat)}</Text>
  },
  {
    title: 'Status',
    key: 'status',
    width: '8%',
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

const JobFairAssignmentTableColumn = (getColumnSearchProps) => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: '3%',
    render(text) {
      return {
        props: {
          style: { textAlign: 'right' }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: 'Job fair name',
    dataIndex: 'jobFairName',
    key: 'jobFairName',
    width: '10%',
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
    title: 'Booth name',
    render: (_, record) => record?.jobFairBooth?.name,
    width: '10%'
  },
  {
    title: 'Assignment type',
    dataIndex: 'assignmentType',
    key: 'assignmentType',
    width: '10%',
    ...getColumnSearchProps('assignmentType'),
    render: (assignmentType) => (
      <>
        <Tag color={'green'}>{convertEnumToString(assignmentType)}</Tag>
      </>
    )
  },
  {
    title: 'Assigner',
    width: '13%',
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
    title: 'Begin time',
    width: '15%',
    key: 'beginTime',
    dataIndex: 'beginTime',
    sorter: (a, b) => a.beginTime - b.beginTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(CustomDateFormat)}</Text>
  },
  {
    title: 'Deadline',
    width: '15%',
    key: 'dueTime',
    dataIndex: 'endTime',
    sorter: (a, b) => a.endTime - b.endTime,
    sortDirections: ['descend'],
    render: (text) => <Text>{moment(text).format(CustomDateFormat)}</Text>
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
