import { Tag } from 'antd';
import { convertToDateString, getMatchingPointColor } from '../../../utils/common';
import React from 'react';
import RoleType from '../../../constants/RoleType';

const companyColumns = () => [
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
      const tagColor = getMatchingPointColor(num * 1000);
      return (
        <div style={{ display: 'flex' }}>
          <Tag color={tagColor} style={{ marginLeft: 'auto' }}>
            {Math.round(num * 1000)} %
          </Tag>
        </div>
      );
    }
  }
];

const attendantColumns = () => [
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
    title: 'Job position',
    dataIndex: 'jobPositionTitle',
    key: 'jobPositionTitle'
  },

  {
    title: 'Company name',
    dataIndex: 'companyName',
    key: 'companyName'
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
  }
];

const ApplicationTableColumn = (role) => () => {
  if (role === RoleType.COMPANY_MANAGER || role === RoleType.COMPANY_EMPLOYEE) return companyColumns();
  return attendantColumns();
};

export default ApplicationTableColumn;
