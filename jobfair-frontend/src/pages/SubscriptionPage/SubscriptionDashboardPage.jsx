import { Typography } from 'antd';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionListContainer from '../../containers/Subscription/SubscriptionList.container';

const { Title, Text } = Typography;

const SubscriptionDashboardPage = () => (
  <PageLayoutWrapper className={'page'}>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '5rem' }}>
      <Title level={2}>Pick your favorite pack</Title>
      <Text strong>Explore all the features of JobHub with just 1 purchase!</Text>
    </div>
    <div style={{ marginLeft: '8rem', marginBottom: '2rem' }}>
      <SubscriptionListContainer />
    </div>
  </PageLayoutWrapper>
);
export default SubscriptionDashboardPage;
