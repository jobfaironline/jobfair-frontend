import { CustomDateFormat, DateFormat } from '../../../constants/ApplicationConst';
import moment from 'moment';

const JobFairForAdminColumn = () => [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    width: '4rem',
    render(text) {
      return {
        props: {
          style: { textAlign: 'end' }
        },
        children: text
      };
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Company name',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: 'Create time',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (time) => moment(time).format(CustomDateFormat)
  },
  {
    title: 'Job fair time range',
    children: [
      {
        title: 'Start time',
        dataIndex: 'jobFairDecorateStartTime',
        key: 'jobFairDecorateStartTime',
        render: (time) => moment(time).format(DateFormat)
      },
      {
        title: 'End time',
        dataIndex: 'jobFairPublicEndTime',
        key: 'jobFairPublicEndTime',
        render: (time) => moment(time).format(DateFormat)
      }
    ]
  }
];

export default JobFairForAdminColumn;
