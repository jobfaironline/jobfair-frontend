import { Tag } from 'antd';

const SubscriptionPlanTableColumn = () => [
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (value) => ({
      children: `$${value}.00`
    }),
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Job fair max quota',
    dataIndex: 'jobfairQuota',
    key: 'jobfairQuota',
    render: (value) => ({
      children: `${value} job fairs`
    })
  },
  {
    title: 'Valid time',
    dataIndex: 'validPeriod',
    render: (value) => <Tag color={'green'}>{value} months</Tag>
  }
];

export default SubscriptionPlanTableColumn;
