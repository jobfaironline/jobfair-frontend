import { Button, Card, Descriptions, Divider, List, Tag, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { convertToUTCString } from '../../utils/common';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import {
  getAllSubscriptionPlanAPI,
  getCurrentSubscriptionAPI
} from '../../services/jobhub-api/SubscriptionControllerService';
import React, { useLayoutEffect, useState } from 'react';

const { Text, Title } = Typography;

const SubscriptionListContainer = () => {
  const history = useHistory();
  const [subscriptionData, setSubscriptionData] = useState();
  const [currentSubscription, setCurrentSubscription] = useState();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const handleGetStarted = (subscriptionId) => {
    const url = generatePath(PATH_COMPANY_MANAGER.SUBSCRIPTION_DETAIL, {
      subscriptionId
    });
    history.push(url);
  };
  const getCurrentSubscription = async () => {
    try {
      const res = await getCurrentSubscriptionAPI();
      setCurrentSubscription(res.data);
    } catch (err) {
      notification['info']({
        message: 'You have no subscription yet'
      });
    }
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

  const fetchData = async () => {
    try {
      await getCurrentSubscription();
      const res = await getAllSubscriptionPlanAPI('ASC', '', '0', pageSize, 'name');
      const result = res.data.content
        .map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          description: item.description,
          type: typeAndBenefitsMapper(item).type,
          benefits: typeAndBenefitsMapper(item).benefits
        }))
        .sort((a, b) => a.price - b.price);
      setTotalRecord(res.data.totalElements);
      setSubscriptionData(result);
    } catch (error) {
      notification['error']({
        message: 'Error when get subscription data',
        duration: 2
      });
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const currentSubscriptionWarning = (item) => {
    if (!item) return;
    return (
      <Card
        bodyStyle={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <Typography.Title level={3} type='danger'>
          Warning
        </Typography.Title>
        <Typography.Paragraph type='danger'>
          You have to <a href={PATH_COMPANY_MANAGER.SUBSCRIPTION_HISTORY}>cancel your current subscription</a> to buy
          the new one.
        </Typography.Paragraph>
        <Descriptions title='Your subscription detail' bordered size='small' style={{ textAlign: 'center' }}>
          <Descriptions.Item label='Subscription Id'>{item.id}</Descriptions.Item>
          <Descriptions.Item label='From date'>{convertToUTCString(item.currentPeriodStart)}</Descriptions.Item>
          <Descriptions.Item label='To date'>{convertToUTCString(item.currentPeriodEnd)}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  return (
    <>
      {currentSubscriptionWarning(currentSubscription)}
      {!currentSubscription && (
        <div style={{ marginLeft: '9rem', marginTop: '2rem' }}>
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
                    {!currentSubscription ? (
                      <Button type='primary' size='large' shape='round'>
                        Get started
                      </Button>
                    ) : null}
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
        </div>
      )}
    </>
  );
};

export default SubscriptionListContainer;
