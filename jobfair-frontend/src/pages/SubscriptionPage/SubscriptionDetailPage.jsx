import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionDetailContainer from '../../containers/Subscription/SubscriptionDetail.container';

const SubscriptionDetailPage = () => {
  const { subscriptionId } = useParams();

  return (
    <PageLayoutWrapper className={'page fullscreen-page non-sub-nav-bar'}>
      <SubscriptionDetailContainer subscriptionId={subscriptionId} />
    </PageLayoutWrapper>
  );
};

export default SubscriptionDetailPage;
