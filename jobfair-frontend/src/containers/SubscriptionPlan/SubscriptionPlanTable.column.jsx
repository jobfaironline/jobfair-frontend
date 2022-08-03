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
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: (value) => ({
  //     children: value ? <Tag>{value}</Tag> : <Tag>ACTIVE</Tag>
  //   })
  // },
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
    })
  },
  {
    title: 'Valid time',
    dataIndex: 'validPeriod',
    render: (value) => <Tag color={'green'}>{value} months</Tag>
  }
];

export default SubscriptionPlanTableColumn;
