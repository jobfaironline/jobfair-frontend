import JobFairGridManagerContainer from '../../containers/JobFairList/manager/JobFairGridManager.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const JobFairGridManagerPage = () => (
  <PageLayoutWrapper className='page'>
    <JobFairGridManagerContainer />
  </PageLayoutWrapper>
);

export default JobFairGridManagerPage;
