import { Button, Card, Collapse, Descriptions, Divider, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { convertToUTCString, getNYearAfter } from '../../utils/common';
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { subscriptionDataConst } from '../../constants/SubscriptionConst';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutFormComponent from '../../components/forms/CheckoutForm/CheckoutForm.component';
import React from 'react';

const SubscriptionDetailContainer = () => {
  const { subscriptionId } = useParams();

  return <SubscriptionDetailComponent subscriptionId={subscriptionId} />;
};

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const EnjoyPlanPayment = ({ amount }) => (
  <Card bodyStyle={{ color: '#4FC3E9', backgroundColor: '#E6FFFB' }}>
    <Title level={2}>Enjoy your payment</Title>
    <Paragraph>
      You'll be charged {amount} per year starting {convertToUTCString(new Date().getTime())}. Your subscription will be
      end at {convertToUTCString(getNYearAfter(1))}. You can cancel at any time in your Setting page.
    </Paragraph>
  </Card>
);

const SubscriptionDetailComponent = ({ subscriptionId }) => {
  const history = useHistory();
  const basicItem = subscriptionDataConst.find((item) => item.type === 'FREE');
  const standardItem = subscriptionDataConst.find((item) => item.type === 'STANDARD');
  const premiumItem = subscriptionDataConst.find((item) => item.type === 'PREMIUM');
  const fullName = useSelector((state) => state?.authentication?.user?.fullName);
  const userEmail = useSelector((state) => state?.authentication?.user?.email);

  const renderHeaderBaseOnType = () => {
    switch (subscriptionId) {
      case '5fdb64a4-a6f1-43dd-8361-1bbd8a940158':
        return (
          <div style={{ width: '50%', marginRight: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <EnjoyPlanPayment amount={basicItem.price} />
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
                  <Descriptions title={<Title level={3}>{basicItem.title}</Title>} column={1}>
                    <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{basicItem.description}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem', marginBottom: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${basicItem.price}.00</p>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                    </Descriptions.Item>
                    {basicItem.benefits.map((benefit) => (
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
                  <Descriptions.Item>
                    <Divider type='vertical' style={{ fontSize: 'bold', backgroundColor: '#000', height: '40rem' }} />
                  </Descriptions.Item>
                  <Descriptions title={<Title level={3}>Order detail:</Title>} column={1}>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Item name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{basicItem.title} for 1 year</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Total bill'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${basicItem.price}.00</p>
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
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{fullName}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Email'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{userEmail}</p>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Panel>
            </Collapse>
          </div>
        );
      case '6f038fc7-4b72-4e38-b9b8-523a013da217':
        return (
          <div style={{ width: '50%', marginRight: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <EnjoyPlanPayment amount={standardItem.price} />
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
                  <Descriptions title={<Title level={3}>{standardItem.title}</Title>} column={1}>
                    <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{standardItem.description}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem', marginBottom: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${standardItem.price}.00</p>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                    </Descriptions.Item>
                    {standardItem.benefits.map((benefit) => (
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
                  <Descriptions.Item>
                    <Divider type='vertical' style={{ fontSize: 'bold', backgroundColor: '#000', height: '40rem' }} />
                  </Descriptions.Item>
                  <Descriptions title={<Title level={3}>Order detail:</Title>} column={1}>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Item name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{standardItem.title} for 1 year</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Total bill'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${standardItem.price}.00</p>
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
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{fullName}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Email'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{userEmail}</p>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Panel>
            </Collapse>
          </div>
        );
      case '4b586522-eee3-4c3a-83db-95e2a4d56aa1':
        return (
          <div style={{ width: '50%', marginRight: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <EnjoyPlanPayment amount={premiumItem.price} />
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
                  <Descriptions title={<Title level={3}>{premiumItem.title}</Title>} column={1}>
                    <Descriptions.Item contentStyle={{ fontSize: '1rem' }} labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{premiumItem.description}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem', marginBottom: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${premiumItem.price}.00</p>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <Divider style={{ fontWeight: 'bold', backgroundColor: '#000' }} />
                    </Descriptions.Item>
                    {premiumItem.benefits.map((benefit) => (
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
                  <Descriptions.Item>
                    <Divider type='vertical' style={{ fontSize: 'bold', backgroundColor: '#000', height: '40rem' }} />
                  </Descriptions.Item>
                  <Descriptions title={<Title level={3}>Order detail:</Title>} column={1}>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Item name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{premiumItem.title} for 1 year</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Total bill'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>${premiumItem.price}.00</p>
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
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Name'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{fullName}</p>
                    </Descriptions.Item>
                    <Descriptions.Item
                      contentStyle={{ fontSize: '1rem' }}
                      labelStyle={{ fontSize: '1rem' }}
                      label='Email'>
                      <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{userEmail}</p>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Panel>
            </Collapse>
          </div>
        );
    }
  };
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
          marginTop: '10rem'
        }}>
        <Title level={3}>Start your subscription pack today!</Title>
        <CheckoutFormComponent subscriptionId={subscriptionId} />
      </div>
      {renderHeaderBaseOnType()}
    </div>
  );
};

export default SubscriptionDetailContainer;
