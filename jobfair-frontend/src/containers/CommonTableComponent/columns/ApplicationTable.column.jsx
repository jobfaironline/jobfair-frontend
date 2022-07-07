import { Tag } from 'antd';
import { convertToDateString } from '../../../utils/common';
import React from 'react';

const defaultColumns = () => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render(text) {
      return {
        props: {
          style: { textAlign: 'end', width: '5px' }
        },
        children: text
      };
    }
  },
  {
    title: "Candidate's name",
    dataIndex: 'candidateName',
    key: 'candidateName'
  },
  {
    title: 'Applied date',
    dataIndex: 'appliedDate',
    key: 'appliedDate',
    render(text) {
      return {
        children: convertToDateString(text)
      };
    }
  },
  {
    title: 'Job position',
    dataIndex: 'jobPositionTitle',
    key: 'jobPositionTitle'
  },
  {
    title: 'Applied job fair',
    dataIndex: 'jobFairName',
    key: 'jobFairName'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => {
      let objStatus;
      switch (status) {
        case 'APPROVE':
          objStatus = {
            color: 'green',
            message: 'Approved'
          };
          break;
        case 'PENDING':
          objStatus = {
            color: 'blue',
            message: 'Pending'
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
  },
  {
    title: 'Matching point',
    dataIndex: 'matchingPoint',
    key: 'matchingPoint',
    width: '10%',
    sorter: (a, b) => a.matchingPoint * 100 - b.matchingPoint * 100,
    render: (num) => {
      let tagColor = 'red';
      if (num > 0.5) tagColor = 'gold';
      if (num > 0.7) tagColor = 'green';
      return (
        <div style={{ display: 'flex' }}>
          <Tag color={tagColor} style={{ marginLeft: 'auto' }}>
            {Math.round(num * 100)} %
          </Tag>
        </div>
      );
    }
  }
];

const ApplicationTableColumn = (getColumnSearchProps, jobPositionId, jobFairId) => {
  if (jobPositionId) return [...defaultColumns()].filter((column) => column.dataIndex != 'jobPosition');
  else if (jobFairId) return [...defaultColumns()].filter((column) => column.dataIndex != 'jobFair');
  else return defaultColumns();
};

export default ApplicationTableColumn;
