import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionHistoryContainer from '../../containers/Subscription/SubscriptionHistory.container';

const SubscriptionHistoryPage = () => (
  <PageLayoutWrapper className={'page'}>
    <SubscriptionHistoryContainer />
  </PageLayoutWrapper>
);

export default SubscriptionHistoryPage;
