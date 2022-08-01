import { Button, Card, Collapse, Descriptions, Divider, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { convertToUTCString, getNYearAfter } from '../../utils/common';
import { faArrowLeft, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { getSubscriptionPlanById } from '../../services/jobhub-api/SubscriptionControllerService';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutFormComponent from '../../components/forms/CheckoutForm/CheckoutForm.component';
import React, { useLayoutEffect, useState } from 'react';

const SubscriptionDetailContainer = ({ subscriptionId }) => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await getSubscriptionPlanById(subscriptionId);
      setData(res.data);
    } catch (err) {
      notification['error']({
        message: 'Not found subscription plan.'
      });
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [subscriptionId]);
  return <SubscriptionDetailComponent subscription={data} />;
};

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const EnjoyPlanPayment = ({ amount }) => (
  <Card bodyStyle={{ color: '#4FC3E9', backgroundColor: '#E6FFFB' }}>
    <Title level={2}>Enjoy your payment</Title>
    <Paragraph>
      You'll be charged <Text strong>${amount}.00</Text> per year starting{' '}
      <Text strong>{convertToUTCString(new Date().getTime())}</Text>. Your subscription will be end at{' '}
      <Text strong>{convertToUTCString(getNYearAfter(1))}</Text>. You can cancel at any time in your Setting page.
    </Paragraph>
  </Card>
);

const SubscriptionDetailComponent = ({ subscription }) => {
  const history = useHistory();
  const fullName = useSelector((state) => state?.authentication?.user?.fullName);
  const userEmail = useSelector((state) => state?.authentication?.user?.email);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginRight: '2rem',
          marginTop: '-20rem'
        }}>
        <Title level={3}>Start your subscription pack today!</Title>
        <CheckoutFormComponent subscriptionId={subscription?.id} />
      </div>
      <div style={{ width: '50%', marginRight: '2rem' }}>
        <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <EnjoyPlanPayment amount={subscription?.price} />
        </div>
        <Collapse bordered={false} defaultActiveKey={'0'} activeKey={'0'}>
          <Panel
            header={
              <Text strong style={{ fontSize: '1rem' }}>
                General information
              </Text>
            }
            extra={
              <Button
                type={'link'}
                onClick={() => {
                  history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_DASH_BOARD);
                }}
                style={{ fontSize: '1rem' }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
                Back to subscription plans
              </Button>
            }>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Descriptions title={<Title level={3}>{subscription?.name}</Title>} column={1}>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{subscription?.description}</p>
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem', marginBottom: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${subscription?.price}.00</p>
                </Descriptions.Item>
                <Descriptions.Item>
                  <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <Title level={3}>Package benefits:</Title>
                </Descriptions.Item>
                {subscription?.benefits?.map((benefit) => (
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
              <Descriptions.Item>
                <Divider type='vertical' style={{ fontSize: 'bold', backgroundColor: '#000', height: '50rem' }} />
              </Descriptions.Item>
              <Descriptions title={<Title level={3}>Order detail:</Title>} column={1}>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label='Item name'>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{subscription?.name} for 1 year</p>
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label='Total bill'>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${subscription?.price}.00</p>
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label='Payment method'>
                  <img style={{ width: '30px', height: '20px' }} src={`${window.location.origin}/icon/visa.png`} />
                </Descriptions.Item>
                <Descriptions.Item>
                  <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <Title level={3}>Customer information:</Title>
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }} label='Name'>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{fullName}</p>
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }} label='Email'>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{userEmail}</p>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SubscriptionDetailContainer;
