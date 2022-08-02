import { Tag } from 'antd';
import { convertToUTCString } from '../../utils/common';

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
    title: 'Amount',
    dataIndex: 'price',
    key: 'price',
    render: (text) => ({
      children: `$${text}.00`
    })
  },
  {
    title: 'Start date',
    dataIndex: 'currentPeriodStart',
    key: 'currentPeriodEnd',
    render: (text) => ({
      children: convertToUTCString(text)
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => ({
      children: value ? <Tag>{value}</Tag> : <Tag color={'green'}>ACTIVE</Tag>
    })
  }
];

export default PaymentReportTableColumn;
