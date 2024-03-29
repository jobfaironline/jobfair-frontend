import PageLayoutWrapper from '../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const AboutApplicationPage = () => (
  <PageLayoutWrapper className='page'>
    <div className='about-application'>
      <h2>{`The version of this app: ${process.env.REACT_APP_VERSION}`}</h2>
    </div>
  </PageLayoutWrapper>
);
export default AboutApplicationPage;
