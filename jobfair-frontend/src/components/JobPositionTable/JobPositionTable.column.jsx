import { Tag } from 'antd'

const JobPositionTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'Job title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      onFilter: (value, record) => record.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortDirections: ['descend']
    },
    {
      title: 'Job type',
      dataIndex: 'jobType',
      key: 'jobType',
      ...getColumnSearchProps('jobType')
    },
    {
      title: 'Job level',
      dataIndex: 'level',
      key: 'level',
      ...getColumnSearchProps('level')
    }
  ]
}

export default JobPositionTableColumn
