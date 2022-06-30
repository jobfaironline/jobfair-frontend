import JobFairGridManagerContainer from '../../containers/JobFairList/manager/JobFairGridManager.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const JobFairGridManagerPage = () => (
  <PageLayoutWrapper className='page'>
    <JobFairGridManagerContainer />
  </PageLayoutWrapper>
);

export default JobFairGridManagerPage;
