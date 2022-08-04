import { Tag, Tooltip, Typography } from 'antd';
import { convertEnumToString, convertToUTCString } from '../../utils/common';

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
      children: `${convertToUTCString(value)}+7`
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
              <Text>{convertToUTCString(value)}+7</Text>
            </Tooltip>
          )
        };
      }
      return {
        children: (
          <Tooltip title={<Text type='success'>This subscription is available</Text>}>
            <Text>{convertToUTCString(value)}+7</Text>
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
    })
  },
  {
    title: 'Total job fair origin',
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
    render: (value) => ({
      children: value === 'NOT_USED' ? <Tag color={'green'}>ACTIVE</Tag> : <Tag>{convertEnumToString(value)}</Tag>
    })
  },
  {
    title: 'Refund status',
    dataIndex: 'refundStatus',
    key: 'refundStatus',
    render: (value) => ({
      children: value ? <Tag>{convertEnumToString(value)}</Tag> : 'Not available'
    })
  }
];

export default SubscriptionHistoryTableColumn;
