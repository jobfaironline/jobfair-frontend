import { Button, Card, Descriptions, Divider, List, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';

const subscriptionData = [
  {
    title: 'Free pack',
    price: '0$',
    description: 'Something to write',
    type: 'FREE',
    benefits: [
      {
        id: 1,
        name: 'Number of booths: maximum 15 booths',
        status: true
      },
      {
        id: 2,
        name: 'Landing page: 3 page',
        status: true
      },
      {
        id: 3,
        name: 'Maximum attendants: maximum 1000 people',
        status: true
      },
      {
        id: 4,
        name: 'Time of public: 7 days',
        status: true
      },
      {
        id: 5,
        name: 'Support 24/7',
        status: false
      },
      {
        id: 6,
        name: 'Default layout',
        status: false
      }
    ]
  },
  {
    title: 'Standard pack',
    price: '600$',
    description: 'Something to write',
    type: 'STANDARD',
    benefits: [
      {
        id: 1,
        name: 'Number of booths: maximum 15 booths',
        status: true
      },
      {
        id: 2,
        name: 'Landing page: 3 page',
        status: true
      },
      {
        id: 3,
        name: 'Maximum attendants: maximum 1000 people',
        status: true
      },
      {
        id: 4,
        name: 'Time of public: 7 days',
        status: true
      },
      {
        id: 5,
        name: 'Support 24/7',
        status: false
      },
      {
        id: 6,
        name: 'Default layout',
        status: false
      }
    ]
  },
  {
    title: 'Premium pack',
    price: '1000$',
    description: 'Something to write',
    type: 'PREMIUM',
    benefits: [
      {
        id: 1,
        name: 'Number of booths: maximum 15 booths',
        status: true
      },
      {
        id: 2,
        name: 'Landing page: 3 page',
        status: true
      },
      {
        id: 3,
        name: 'Maximum attendants: maximum 1000 people',
        status: true
      },
      {
        id: 4,
        name: 'Time of public: 7 days',
        status: true
      },
      {
        id: 5,
        name: 'Support 24/7',
        status: true
      },
      {
        id: 6,
        name: 'Default layout',
        status: true
      }
    ]
  }
];

const { Text, Title } = Typography;

const SubscriptionListContainer = () => {
  const history = useHistory();

  const handleGetStarted = (type) => {
    const url = generatePath(PATH_COMPANY_MANAGER.SUBSCRIPTION_DETAIL, {
      type
    });
    history.push(url);
  };

  return (
    <List
      grid={{
        gutter: 16 + 8 * 8, //16 + 8n
        column: 3,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 3,
        xxl: 3
      }}
      dataSource={subscriptionData}
      renderItem={(item) => (
        <Card
          style={{ width: '75%', alignItems: 'center', marginTop: '2rem' }}
          actions={[
            <div style={{ height: 30, marginBottom: '1rem' }} onClick={() => handleGetStarted(item.type)}>
              <Button type='primary' size='large' shape='round'>
                Get started
              </Button>
            </div>
          ]}>
          <Descriptions title={<Title level={3}>{item.title}</Title>} column={1}>
            <Descriptions.Item>
              <Tag color={'blue'}>One-time purchase</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={'Description'}>{item.description}</Descriptions.Item>
            <Descriptions.Item label={'Price'}>{item.price}</Descriptions.Item>
            <Descriptions.Item>
              <Divider />
            </Descriptions.Item>
            {item.benefits.map((benefit) => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '1rem' }}>
                  <FontAwesomeIcon icon={faCircleCheck} color={benefit.status ? 'green' : 'red'} size={'2x'} />
                </div>
                <Text strong style={{ marginLeft: '1rem' }}>
                  {benefit.name}
                </Text>
              </div>
            ))}
          </Descriptions>
        </Card>
      )}
    />
  );
};

export default SubscriptionListContainer;
