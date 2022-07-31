import { Button, Card, Descriptions, Divider, List, Tag, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getAllSubscriptionAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import React, { useEffect, useState } from 'react';

const { Text, Title } = Typography;

const SubscriptionListContainer = () => {
  const history = useHistory();
  const [subscriptionData, setSubscriptionData] = useState();

  const handleGetStarted = (subscriptionId) => {
    const url = generatePath(PATH_COMPANY_MANAGER.SUBSCRIPTION_DETAIL, {
      subscriptionId
    });
    history.push(url);
  };

  const typeAndBenefitsMapper = (item) => {
    switch (item.id) {
      case '5fdb64a4-a6f1-43dd-8361-1bbd8a940158':
        return {
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
              name: 'Time of public: 3 days',
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
        };
      case '6f038fc7-4b72-4e38-b9b8-523a013da217':
        return {
          type: 'STANDARD',
          benefits: [
            {
              id: 1,
              name: 'Number of booths: maximum 10 booths',
              status: true
            },
            {
              id: 2,
              name: 'Landing page: 3 page',
              status: true
            },
            {
              id: 3,
              name: 'Maximum attendants: maximum 500 people',
              status: true
            },
            {
              id: 4,
              name: 'Time of public: 5 days',
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
        };
      case '4b586522-eee3-4c3a-83db-95e2a4d56aa1':
        return {
          type: 'PREMIUM',
          benefits: [
            {
              id: 1,
              name: 'Number of booths: maximum 15 booths',
              status: true
            },
            {
              id: 2,
              name: 'Landing page: Unlimited',
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
        };
      default:
        return {
          type: 'OTHERS',
          benefits: []
        };
    }
  };

  useEffect(async () => {
    try {
      const res = await getAllSubscriptionAPI();
      const result = res.data
        .map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          description: item.description,
          type: typeAndBenefitsMapper(item).type,
          benefits: typeAndBenefitsMapper(item).benefits
        }))
        .sort((a, b) => a.price - b.price);
      setSubscriptionData(result);
    } catch (error) {
      notification['error']({
        message: 'Error when get subscription data',
        duration: 2
      });
    }
  }, []);

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
          style={{
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            marginBottom: '2rem',
            marginTop: '2rem',
            width: '75%'
          }}
          headStyle={{ backgroundColor: 'white', border: 0 }}
          bodyStyle={{ backgroundColor: 'white', border: 0 }}
          actions={[
            <div style={{ height: 30, marginBottom: '1rem' }} onClick={() => handleGetStarted(item.id)}>
              <Button type='primary' size='large' shape='round'>
                Get started
              </Button>
            </div>
          ]}>
          <Descriptions title={<Title level={3}>{item.title}</Title>} column={1}>
            <Descriptions.Item>
              <Tag color={'blue'}>One-time purchase</Tag>
            </Descriptions.Item>
            <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.description}</p>
            </Descriptions.Item>
            <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${item.price}.00</p>
            </Descriptions.Item>
            <Descriptions.Item>
              <Divider />
            </Descriptions.Item>
            {item.benefits.map((benefit) => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '1rem' }}>
                  <FontAwesomeIcon
                    icon={benefit.status ? faCircleCheck : faCircleXmark}
                    color={benefit.status ? 'green' : 'red'}
                    size={'2x'}
                  />
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
