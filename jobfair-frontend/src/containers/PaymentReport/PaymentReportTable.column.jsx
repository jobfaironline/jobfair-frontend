import { Tag, Tooltip, Typography } from 'antd';
import { convertEnumToString, toLocaleUTCDateString } from '../../utils/common';

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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filter: [
      {
        text: 'Active',
        value: 'ACTIVE'
      },
      {
        text: 'Inactive',
        value: 'INACTIVE'
      }
    ],
    render: (value) => ({
      children:
        value === 'ACTIVE' ? (
          <Tag color={'green'}>{convertEnumToString(value)}</Tag>
        ) : value === 'INACTIVE' ? (
          <Tag color={'red'}>{convertEnumToString(value)}</Tag>
        ) : (
          <Tag>{convertEnumToString(value)}</Tag>
        )
    }),
    onFilter: (value, record) => record.status.includes(value)
  },
  {
    title: 'Refund status',
    dataIndex: 'refundStatus',
    key: 'refundStatus',
    render: (value) => ({
      children:
        value === 'REQUESTED_REFUND' ? (
          <Tag color={'gold'}>{convertEnumToString(value)}</Tag>
        ) : value === 'REFUNDED' ? (
          <Tag color={'green'}>{convertEnumToString(value)}</Tag>
        ) : (
          <Tag color={'red'}>{value ? value : 'Not yet'}</Tag>
        )
    }),
    onFilter: (value, record) => record.name.includes(value)
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
