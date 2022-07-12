import { FAQComponent } from '../../components/customized-components/FAQ/FAQ.components';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const FAQPage = () => (
  <PageLayoutWrapper className='page faq-page'>
    <FAQComponent />
  </PageLayoutWrapper>
);

export default FAQPage;
