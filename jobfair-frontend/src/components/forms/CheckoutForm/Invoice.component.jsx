import { Card, Divider, Typography } from 'antd';
import { convertToUTCString } from '../../../utils/common';
import React from 'react';

const { Title, Text } = Typography;
const InvoiceComponent = (props) => {
  const { item } = props;
  return (
    <Card style={{ borderRadius: '30px' }}>
      <div>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Title level={2}>Receipt from JobHub</Title>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Title level={5}>AMOUNT PAID</Title>
              <Text>
                {item?.amount / 100} {item?.currency.toUpperCase()}
              </Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Title level={5}>DATE PAID</Title>
              <Text>{convertToUTCString(item?.purchaseDate)}+7</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Title level={5}>PAYMENT METHOD</Title>
              <Text>{item?.paymentMethod.toUpperCase()}</Text>
              <Text>Last 4 digits: {item?.last4}</Text>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Title level={5}>SUMMARY</Title>
        </div>
        <Card style={{ backgroundColor: '#F6F9FC', borderRadius: '30px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>{item?.description}</Text>
              <Text>
                {item?.amount / 100} {item?.currency.toUpperCase()}
              </Text>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Amount charge</Text>
              <Text>
                {item?.amount / 100} {item?.currency.toUpperCase()}
              </Text>
            </div>
          </div>
        </Card>
        <Divider />
        <div>
          <Text>
            If you have any questions, contact us at <a href='mailto:contact@jobhub.works'>Job hub service</a>
          </Text>
        </div>
        <Divider />
        <div>
          <Text>
            You're receiving this email because you made a purchase at JobHub, which partners with Stripe to provide
            invoicing and payment processing.
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceComponent;
