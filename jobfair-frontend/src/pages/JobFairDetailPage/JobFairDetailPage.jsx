import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import JobFairDetailContainer from '../../containers/JobFairDetail/JobFairDetail.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const JobFairDetailPage = () => {
  const history = useHistory();
  return (
    <PageLayoutWrapper className='page' style={{ marginTop: 80 }}>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Job fair detail' subTitle='' />
      <JobFairDetailContainer />
    </PageLayoutWrapper>
  );
};

export default JobFairDetailPage;
