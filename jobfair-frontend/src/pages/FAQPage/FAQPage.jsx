import { FAQComponent } from '../../components/customized-components/FAQ/FAQ.components';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const FAQPage = () => (
  <PageLayoutWrapper className='page faq-page'>
    <FAQComponent />
  </PageLayoutWrapper>
);

export default FAQPage;
