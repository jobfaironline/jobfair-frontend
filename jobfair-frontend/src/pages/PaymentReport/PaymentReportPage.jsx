import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import PaymentReportContainer from '../../containers/PaymentReport/PaymentReport.container';
import React from 'react';

const PaymentReportPage = () => (
  <PageLayoutWrapper className={'page'}>
    <PaymentReportContainer />
  </PageLayoutWrapper>
);

export default PaymentReportPage;
