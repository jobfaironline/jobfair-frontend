import React from 'react'
import { Tag } from 'antd'

const defaultColumns = getColumnSearchProps => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      ...getColumnSearchProps('no'),
      render(text) {
        return {
          props: {
            style: { textAlign: 'end', width: '5px' }
          },
          children: text
        }
      }
    },
    {
      title: 'Company name',
      dataIndex: 'companyName',
      key: 'companyName',
      ...getColumnSearchProps('companyName')
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      key: 'createDate',
      ...getColumnSearchProps('createDate')
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description')
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'Pending',
          value: 'PENDING'
        },
        {
          text: 'Approved',
          value: 'APPROVED'
        },
        {
          text: 'Denied',
          value: 'DENIED'
        }
      ],
      onFilter: (value, record) => {
        return record.status === value
      },
      render: status => {
        let objStatus
        switch (status) {
          case 'APPROVE':
            objStatus = {
              color: 'green',
              message: 'Approved'
            }
            break
          case 'DRAFT':
            objStatus = {
              color: 'gold',
              message: 'Draft'
            }
            break
          case 'PENDING':
            objStatus = {
              color: 'blue',
              message: 'Pending'
            }
            break
          case 'DELETED':
            objStatus = {
              color: 'magenta',
              message: 'Deleted'
            }
            break
          case 'CANCEL':
            objStatus = {
              color: 'volcano',
              message: 'Cancel'
            }
            break
          case 'REQUEST_CHANGE':
            objStatus = {
              color: 'purple',
              message: 'Request change'
            }
            break
          default:
            objStatus = {
              color: 'red',
              message: 'Rejected'
            }
            break
        }
        return (
          <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
        )
      }
    }
  ]
}

const EvaluateBoothInformationTableColumn = (
  getColumnSearchProps,
  jobFairId
) => {
  if (jobFairId !== undefined) {
    return defaultColumns(getColumnSearchProps)
  } else {
    return [
      {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        ...getColumnSearchProps('no'),
        render(text) {
          return {
            props: {
              style: { textAlign: 'end', width: '5px' }
            },
            children: text
          }
        }
      },
      {
        title: 'Job fair name',
        dataIndex: 'jobFairName',
        key: 'jobFairName',
        ...getColumnSearchProps('jobFairName')
      },
      {
        title: 'Company name',
        dataIndex: 'companyName',
        key: 'companyName',
        ...getColumnSearchProps('companyName')
      },
      {
        title: 'Create date',
        dataIndex: 'createDate',
        key: 'createDate',
        ...getColumnSearchProps('createDate')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...getColumnSearchProps('description')
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        filters: [
          {
            text: 'Pending',
            value: 'PENDING'
          },
          {
            text: 'Approved',
            value: 'APPROVED'
          },
          {
            text: 'Denied',
            value: 'DENIED'
          }
        ],
        onFilter: (value, record) => {
          return record.status === value
        },
        render: status => {
          let objStatus
          switch (status) {
            case 'APPROVE':
              objStatus = {
                color: 'green',
                message: 'Approved'
              }
              break
            case 'DRAFT':
              objStatus = {
                color: 'gold',
                message: 'Draft'
              }
              break
            case 'PENDING':
              objStatus = {
                color: 'blue',
                message: 'Pending'
              }
              break
            case 'DELETED':
              objStatus = {
                color: 'magenta',
                message: 'Deleted'
              }
              break
            case 'CANCEL':
              objStatus = {
                color: 'volcano',
                message: 'Cancel'
              }
              break
            case 'REQUEST_CHANGE':
              objStatus = {
                color: 'purple',
                message: 'Request change'
              }
              break
            default:
              objStatus = {
                color: 'red',
                message: 'Rejected'
              }
              break
          }
          return (
            <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
          )
        }
      }
    ]
  }
}

export default EvaluateBoothInformationTableColumn
