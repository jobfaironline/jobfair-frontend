// "id": "4d6a5fad-fe7a-43c2-a4b0-e6451f49ba9e",
//   "status": null,
//   "currentPeriodStart": 1659265055228,
//   "currentPeriodEnd": 1690822007228,
//   "cancelAt": null,
//   "defaultPaymentMethod": null,
//   "price": 800
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
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: (value) => ({
  //     children: value ? <Tag>{value}</Tag> : <Tag>ACTIVE</Tag>
  //   })
  // },
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
  }
];

export default SubscriptionHistoryTableColumn;
