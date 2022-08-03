import { Tag } from 'antd';
import { convertToUTCString } from '../../utils/common';

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
    title: 'Product name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Product description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Start date',
    dataIndex: 'currentPeriodStart',
    key: 'currentPeriodStart',
    render: (value) => ({
      children: convertToUTCString(value)
    })
  },
  {
    title: 'End date',
    dataIndex: 'currentPeriodEnd',
    key: 'currentPeriodEnd',
    render: (value) => ({
      children: convertToUTCString(value)
    })
  },
  {
    title: 'Total price',
    dataIndex: 'price',
    key: 'price',
    render: (value) => ({
      children: `$${value}.00`
    })
  },
  {
    title: 'Available job fairs',
    dataIndex: 'jobfairQuota',
    key: 'jobfairQuota',
    render: (value) => ({
      children: `${value} left`
    })
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => ({
      children: value === 'NOT_USED' ? <Tag color={'green'}>ACTIVE</Tag> : <Tag>{value}</Tag>
    })
  }
];

export default SubscriptionHistoryTableColumn;
