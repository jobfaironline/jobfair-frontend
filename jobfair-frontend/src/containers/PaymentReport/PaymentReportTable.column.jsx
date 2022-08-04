import { Tag, Tooltip, Typography } from 'antd';
import { convertEnumToString, convertToUTCString } from '../../utils/common';

const { Text } = Typography;
const PaymentReportTableColumn = () => [
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
    title: 'Company name',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: 'Amount',
    dataIndex: 'price',
    key: 'price',
    render: (text) => ({
      children: `$${text}.00`
    })
  },
  {
    title: 'Purchase date',
    dataIndex: 'currentPeriodStart',
    key: 'currentPeriodEnd',
    render: (text) => ({
      children: `${convertToUTCString(text)}+7`
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
  },
  {
    title: 'Published job fairs',
    dataIndex: 'publishedJobFair',
    key: 'publishedJobFair',
    render: (value) => ({
      children: `${value} job fairs`
    })
  },
  {
    title: 'Total job fairs origin',
    dataIndex: 'maxJobFairQuota',
    key: 'maxJobFairQuota',
    render: (value) => ({
      children: `${value} job fairs`
    })
  }
];

export default PaymentReportTableColumn;
