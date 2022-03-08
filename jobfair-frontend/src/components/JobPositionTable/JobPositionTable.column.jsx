import { Tag } from 'antd'

const JobPositionTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'Job title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
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
