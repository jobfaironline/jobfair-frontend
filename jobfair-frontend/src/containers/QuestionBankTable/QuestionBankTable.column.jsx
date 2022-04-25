import React from 'react';

const QuestionBankTableColumn = (getColumnSearchProps) => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render(text) {
      return {
        props: {
          style: { textAlign: 'center', width: '1rem' }
        },
        children: text
      };
    }
  },
  {
    title: 'Question ID',
    dataIndex: 'id',
    key: 'id',
    ...getColumnSearchProps('id'),
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ['descend'],
    width: '20rem'
  },
  {
    title: 'Question content',
    dataIndex: 'content',
    key: 'content',
    ...getColumnSearchProps('content')
  }
];

export default QuestionBankTableColumn;
