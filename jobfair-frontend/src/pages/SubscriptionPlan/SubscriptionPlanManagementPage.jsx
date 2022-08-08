import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionPlanContainer from '../../containers/SubscriptionPlan/SubscriptionPlan.container';

const SubscriptionPlanManagementPage = () => (
  <PageLayoutWrapper className={'page'}>
    <SubscriptionPlanContainer />
  </PageLayoutWrapper>
);

export default SubscriptionPlanManagementPage;
