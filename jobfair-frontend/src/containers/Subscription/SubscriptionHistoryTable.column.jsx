import { Tag, Tooltip, Typography } from 'antd';
import { convertEnumToString, toLocaleUTCDateString } from '../../utils/common';

const { Text } = Typography;
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
    title: 'Purchase date',
    dataIndex: 'currentPeriodStart',
    key: 'currentPeriodStart',
    render: (value) => ({
      children: `${toLocaleUTCDateString(value, 'en-US', '7')}`
    })
  },
  {
    title: 'Expired date',
    dataIndex: 'currentPeriodEnd',
    key: 'currentPeriodEnd',
    render: (value) => {
      if (new Date().getTime() > value) {
        return {
          children: (
            <Tooltip title={<Text type='danger'>This subscription is expired</Text>}>
              <Text>{toLocaleUTCDateString(value, 'en-US', '7')}</Text>
            </Tooltip>
          )
        };
      }
      return {
        children: (
          <Tooltip title={<Text type='success'>This subscription is available</Text>}>
            <Text>{toLocaleUTCDateString(value, 'en-US', '7')}</Text>
          </Tooltip>
        )
      };
    }
  },
  {
    title: 'Total price',
    dataIndex: 'price',
    key: 'price',
    render: (value) => ({
      children: `$${value}.00`
    }),
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Total allow job fair',
    dataIndex: 'maxJobFairQuota',
    key: 'maxJobFairQuota',
    render: (value) => ({
      children: `${value} job fairs`
    })
  },
  {
    title: 'Published job fair',
    dataIndex: 'publishedJobFair',
    key: 'publishedJobFair',
    render: (value) => ({
      children: `${value} job fairs`
    })
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Active',
        value: 'ACTIVE'
      },
      {
        text: 'Inactive',
        value: 'INACTIVE'
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (value) => ({
      children:
        value === 'ACTIVE' ? (
          <Tag color={'green'}>{convertEnumToString(value)}</Tag>
        ) : value === 'INACTIVE' ? (
          <Tag color={'red'}>{convertEnumToString(value)}</Tag>
        ) : (
          <Tag>{convertEnumToString(value)}</Tag>
        )
    })
  },
  {
    title: 'Refund status',
    dataIndex: 'refundStatus',
    key: 'refundStatus',
    filters: [
      {
        text: 'Requested refund',
        value: 'REQUESTED_REFUND'
      },
      {
        text: 'Refunded',
        value: 'REFUNDED'
      },
      {
        text: 'Refund declined',
        value: 'REFUND_DECLINED'
      }
    ],
    onFilter: (value, record) => record.refundStatus?.indexOf(value) === 0,
    render: (value) => ({
      children:
        value === 'REQUESTED_REFUND' ? (
          <Tag color={'gold'}>{convertEnumToString(value)}</Tag>
        ) : value === 'REFUNDED' ? (
          <Tag color={'green'}>{convertEnumToString(value)}</Tag>
        ) : (
          <Tag color={'red'}>{value ? convertEnumToString(value) : 'Not yet'}</Tag>
        )
    })
  }
];

export default SubscriptionHistoryTableColumn;
