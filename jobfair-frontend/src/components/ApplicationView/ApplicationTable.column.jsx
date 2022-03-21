import React from 'react'
import { Tag } from 'antd'
import { convertToDateString } from '../../utils/common'

const defaultColumns = getColumnSearchProps => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render(text, record) {
        return {
          props: {
            style: { textAlign: 'end', width: '5px' }
          },
          children: text
        }
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
      render(text, record) {
        return {
          children: convertToDateString(text)
        }
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
      render: status => {
        let objStatus
        switch (status) {
          case 'APPROVE':
            objStatus = {
              color: 'green',
              message: 'Approved'
            }
            break
          case 'PENDING':
            objStatus = {
              color: 'blue',
              message: 'Pending'
            }
            break
          default:
            objStatus = {
              color: 'red',
              message: 'Rejected'
            }
            break
        }
        return <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
      }
    }
  ]
}

const ApplicationTableColumn = (getColumnSearchProps, jobPositionId, jobFairId) => {
  if (jobPositionId) {
    return [...defaultColumns(getColumnSearchProps)].filter(column => column.dataIndex != 'jobPosition')
  } else if (jobFairId) {
    return [...defaultColumns(getColumnSearchProps)].filter(column => column.dataIndex != 'jobFair')
  } else {
    return defaultColumns(getColumnSearchProps)
  }
}

export default ApplicationTableColumn
