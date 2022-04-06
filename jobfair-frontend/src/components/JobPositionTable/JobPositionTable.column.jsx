const JobPositionTableColumn = getColumnSearchProps => {
  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render(text) {
        return {
          props: {
            style: { width: '3rem', textAlign: 'right' }
          },
          children: <div>{text}</div>
        }
      }
    },
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
