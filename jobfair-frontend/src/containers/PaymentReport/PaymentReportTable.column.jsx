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
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Description',
    dataIndex: 'currentPeriodEnd',
    key: 'currentPeriodEnd'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => ({
      children: value ? <Tag>{value}</Tag> : <Tag>ACTIVE</Tag>
    })
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => ({
      children: convertToUTCString(value)
    })
  }
];

export default PaymentReportTableColumn;
