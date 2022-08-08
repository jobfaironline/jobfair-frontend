import { Button, Card, Descriptions, Modal, Select, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getNYearAfter, toLocaleUTCDateString } from '../../utils/common';
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

const EnjoyPlanPayment = ({ amount }) => (
  <Card
    bodyStyle={{ color: '#4FC3E9', backgroundColor: '#E6FFFB', borderRadius: '30px' }}
    style={{ borderRadius: '30px', border: '1px solid black' }}>
    <Title level={2}>Enjoy your payment</Title>
    <Paragraph>
      You'll be charged <Text strong>${amount}.00</Text> at{' '}
      <Text strong>{toLocaleUTCDateString(new Date().getTime(), 'en-US', '7')}</Text>. Your subscription will be end at{' '}
      <Text strong>{toLocaleUTCDateString(getNYearAfter(1), 'en-US', '7')}</Text>. You can refund at any time in your{' '}
      <a onClick={() => window.open(PATH_COMPANY_MANAGER.SUBSCRIPTION_HISTORY)}>Subscription history </a> page.
    </Paragraph>
  </Card>
);

const SubscriptionDetailComponent = ({ subscription }) => {
  const history = useHistory();
  const fullName = useSelector((state) => state?.authentication?.user?.fullName);
  const userEmail = useSelector((state) => state?.authentication?.user?.email);
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
      {visible && (
        <Modal
          width={'max-content'}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          centered={true}
          title={'Please input Card Information'}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
              // marginRight: '2rem',
              // marginTop: '-20rem',
              // position: 'absolute'
            }}>
            <Title level={3}>Start your subscription pack today!</Title>
            <CheckoutFormComponent subscriptionId={subscription?.id} />
          </div>
        </Modal>
      )}
      <div style={{ width: '50%', marginRight: '2rem' }}>
        <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          <EnjoyPlanPayment amount={subscription?.price} />
        </div>
        <Button
          type={'link'}
          onClick={() => {
            history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_DASH_BOARD);
          }}
          style={{ fontSize: '1rem' }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
          Back to subscription plans
        </Button>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Card style={{ borderRadius: '30px' }}>
            <Card style={{ borderRadius: '30px' }}>
              <Descriptions title={<Title level={3}>{subscription?.name}</Title>} column={1}>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{subscription?.description}</p>
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem', marginBottom: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${subscription?.price}.00</p>
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                  <Title level={3}>Package benefits: {subscription?.jobfairQuota} published job fairs</Title>
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card style={{ borderRadius: '30px', marginTop: '1rem' }}>
              <Descriptions title={<Title level={3}>Order detail:</Title>} column={1}>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label='Item name'>
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                    {subscription?.name} for {subscription?.validPeriod} months
                  </p>
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{ fontSize: '1rem' }}
                  labelStyle={{ fontSize: '1rem' }}
                  label='Available in'>
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                    {subscription?.validPeriod} months
                  </p>
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
                  <Select
                    labelInValue
                    defaultValue={{
                      value: (
                        <img
                          style={{ width: '30px', height: '20px' }}
                          src={`${window.location.origin}/icon/visa.png`}
                        />
                      )
                    }}
                    style={{ width: 120, position: 'absolute', zIndex: 10 }}>
                    <Select.Option value={'VISA'}>
                      <img style={{ width: '30px', height: '20px' }} src={`${window.location.origin}/icon/visa.png`} />
                    </Select.Option>
                  </Select>
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
              <div>
                <Button type='primary' onClick={() => setVisible(true)}>
                  Proceed to checkout
                </Button>
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailContainer;
