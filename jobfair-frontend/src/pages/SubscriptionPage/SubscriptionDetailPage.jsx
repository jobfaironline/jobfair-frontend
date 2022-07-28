import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionDetailContainer from '../../containers/Subscription/SubscriptionDetail.container';

const SubscriptionDetailPage = () => {
  const { type } = useParams();

  return (
    <PageLayoutWrapper className={'page'}>
      <SubscriptionDetailContainer type={type} />
    </PageLayoutWrapper>
  );
};

export default SubscriptionDetailPage;
