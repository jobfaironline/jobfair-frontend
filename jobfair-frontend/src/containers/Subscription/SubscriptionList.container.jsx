import { Button, Card, Descriptions, Divider, List, Tag, Typography, notification } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import { getAllSubscriptionPlanAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import React, { useLayoutEffect, useState } from 'react';

const { Text, Title } = Typography;

const SubscriptionListContainer = () => {
  const history = useHistory();
  const [subscriptionData, setSubscriptionData] = useState();

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

  const typeAndBenefitsMapper = (item) => {
    switch (item.id) {
      case '5fdb64a4-a6f1-43dd-8361-1bbd8a940158':
        return {
          type: 'FREE',
          benefits: [
            {
              id: 1,
              name: '3 job fairs',
              status: true
            }
          ]
        };
      case '6f038fc7-4b72-4e38-b9b8-523a013da217':
        return {
          type: 'STANDARD',
          benefits: [
            {
              id: 1,
              name: '5 job fairs',
              status: true
            }
          ]
        };
      case '4b586522-eee3-4c3a-83db-95e2a4d56aa1':
        return {
          type: 'PREMIUM',
          benefits: [
            {
              id: 1,
              name: '7 job fairs',
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
      const res = await getAllSubscriptionPlanAPI('ASC', '', '0', pageSize, 'name');
      res.data.content.sort((a, b) => a.price - b.price);
      const result = res.data.content.map((item) => ({
        id: item.id,
        title: item.name,
        price: item.price,
        description: item.description,
        type: typeAndBenefitsMapper(item).type,
        benefits: typeAndBenefitsMapper(item).benefits
      }));
      setTotalRecord(res.data.totalElements);
      setSubscriptionData(result);
    } catch (error) {
      notification['error']({
        message: 'Error when get subscription plans data',
        duration: 2
      });
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <>
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
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label={'Benefits'}>
                  {item.benefits.map((benefit) => (
                    <Tag color={'green'}>{benefit.name}</Tag>
                  ))}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        />
      </div>
    </>
  );
};

export default SubscriptionListContainer;
