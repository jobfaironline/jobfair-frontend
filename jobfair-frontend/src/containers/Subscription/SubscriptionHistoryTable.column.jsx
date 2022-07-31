const SubscriptionHistoryTableColumn = () => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render: (text) => ({
      props: {
        style: { textAlign: 'end', width: '5px' }
      },
      children: text
    })
  },
  {
    title: 'Subscription ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Total price',
    dataIndex: 'price',
    key: 'price'
  }
];

export default SubscriptionHistoryTableColumn;
