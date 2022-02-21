import { Tag } from 'antd'

const EmployeeTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id')
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'Verified',
          value: 'VERIFIED'
        },
        {
          text: 'Inactive',
          value: 'INACTIVE'
        }
      ],
      onFilter: (value, record) => {
        return record.status === value
      },
      render: status => {
        let objStatus
        switch (status) {
          case 'VERIFIED':
            objStatus = {
              color: 'success',
              message: 'Verified'
            }
            break
          case 'REGISTERED':
            objStatus = {
              color: 'processing',
              message: 'Registered'
            }
            break
          case 'SUSPENSED':
            objStatus = {
              color: 'warning',
              message: 'Suspensed'
            }
            break
          default:
            objStatus = {
              color: 'error',
              message: 'Inactive'
            }
            break
        }
        return (
          <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag> // prettier-ignore
        )
      }
    }
  ]
}

export default EmployeeTableColumn
