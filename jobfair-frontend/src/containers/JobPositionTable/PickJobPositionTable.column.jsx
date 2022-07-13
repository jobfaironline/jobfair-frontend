const PickJobPositionTableColumn = () => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: '10%',
    render(text) {
      return {
        props: {
          style: { width: '3rem', textAlign: 'right' }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: 'Job title',
    dataIndex: 'title',
    key: 'title',
    width: '40%',
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    sortDirections: ['ascend']
  },
  {
    title: 'Job type',
    dataIndex: 'jobType',
    key: 'jobType',
    width: '20%'
  },
  {
    title: 'Job level',
    dataIndex: 'level',
    key: 'level',
    width: '30%'
  }
];

export default PickJobPositionTableColumn;
