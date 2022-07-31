import { Avatar, Tag } from 'antd';

const AccountTableColumn = () => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render(text) {
      return {
        props: {
          style: { textAlign: 'end', width: '5px' }
        },
        children: text
      };
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['email']
  },
  {
    title: 'Avatar',
    key: 'avatar',
    render: (_, record) => <Avatar src={record.profileImageUrl} size={50} />
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
    key: 'fullName',
    onFilter: (value, record) => record.fullName.indexOf(value) === 0,
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    sortDirections: ['descend']
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Verified',
        value: 'VERIFIED'
      },
      {
        text: 'Inactive',
        value: 'INACTIVE'
      },
      {
        text: 'Suspensed',
        value: 'SUSPENSED'
      },
      {
        text: 'Registered',
        value: 'REGISTERED'
      }
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let objStatus;
      switch (status) {
        case 'VERIFIED':
          objStatus = {
            color: 'success',
            message: 'Verified'
          };
          break;
        case 'REGISTERED':
          objStatus = {
            color: 'blue',
            message: 'Registered'
          };
          break;
        case 'SUSPENSED':
          objStatus = {
            color: 'warning',
            message: 'Suspensed'
          };
          break;
        default:
          objStatus = {
            color: 'error',
            message: 'Inactive'
          };
          break;
      }
      return (
        <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag> // prettier-ignore
      );
    }
  }
];

export default AccountTableColumn;
