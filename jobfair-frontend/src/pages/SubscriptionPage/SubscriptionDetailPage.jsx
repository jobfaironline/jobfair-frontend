import { subscriptionDataConst } from '../../constants/SubscriptionConst';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionDetailContainer from '../../containers/Subscription/SubscriptionDetail.container';

class SubscriptionDetailPage extends React.Component {
  componentDidUpdate() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  render() {
    return (
      <PageLayoutWrapper className={'page fullscreen-page non-sub-nav-bar'}>
        <SubscriptionDetailContainer item={subscriptionDataConst} />
      </PageLayoutWrapper>
    );
  }
}

export default SubscriptionDetailPage;
