import { Tooltip, Typography } from 'antd';
import { toLocaleUTCDateString } from '../../utils/common';
import React from 'react';

const { Text } = Typography;
const PickSubscriptionTableColumn = () => [
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
  }
];

export default PickSubscriptionTableColumn;
