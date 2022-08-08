import './SubscriptionList.styles.scss';
import { Button, Card, Descriptions, Divider, List, Tag, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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

  const fetchData = async () => {
    try {
      const res = await getAllSubscriptionPlanAPI('ASC', '', '0', pageSize, 'name');

      res.data.content.sort((a, b) => a.price - b.price);
      const result = res.data.content
        .map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          description: item.description,
          jobfairQuota: item.jobfairQuota,
          validPeriod: item.validPeriod
        }))
        .filter(
          (item) =>
            item.id === '6f038fc7-4b72-4e38-b9b8-523a013da217' ||
            item.id === '5fdb64a4-a6f1-43dd-8361-1bbd8a940158' ||
            item.id === '4b586522-eee3-4c3a-83db-95e2a4d56aa1'
        );
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
            gutter: 16 + 8, //16 + 8n
            column: 3,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          dataSource={subscriptionData}
          renderItem={(item) => (
            <Card
              style={{
                marginBottom: '2rem',
                marginTop: '2rem',
                width: '75%',
                borderRadius: '20px',
                border: '1px solid black'
              }}
              headStyle={{ backgroundColor: 'white', border: 0 }}
              bodyStyle={{
                backgroundColor: 'white',
                border: 0,
                width: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '30px'
              }}
              actions={[
                <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    type='primary'
                    size='large'
                    shape='round'
                    onClick={() => handleGetStarted(item.id)}
                    style={{ width: '75%' }}>
                    Get started
                  </Button>
                  <Text>
                    <a onClick={() => window.open(PATH.FAQ_PAGE)}>Terms and conditions apply.</a>
                  </Text>
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
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Available in {item.validPeriod} months</p>
                </Descriptions.Item>
                <Descriptions.Item>
                  <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <FontAwesomeIcon icon={faCheck} />
                  <div style={{ marginLeft: '1rem' }}>
                    <Text> Publish {item.jobfairQuota} job fairs</Text>
                  </div>
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
