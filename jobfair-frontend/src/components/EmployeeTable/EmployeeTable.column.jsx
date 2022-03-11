import {Tag} from 'antd'

const EmployeeTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render(text, record) {
        return {
          props: {
            style: {textAlign: 'end', width: '5px'}
          },
          children: text
        }
      }
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getColumnSearchProps('fullName'),
      onFilter: (value, record) => record.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
        },
        {
          text: 'Suspensed',
          value: 'SUSPENSED'
        },
        {
          text: 'Registered',
          value: 'REGISTERED'
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
