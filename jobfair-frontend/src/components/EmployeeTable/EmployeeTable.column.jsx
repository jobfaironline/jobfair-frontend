import { Tag } from 'antd'

const EmployeeTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      ...getColumnSearchProps('no')
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      sortDirections: ['descend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone')
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
