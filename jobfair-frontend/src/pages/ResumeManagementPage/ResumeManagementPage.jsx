import MyResumeListContainer from '../../containers/MyResumeList/MyResumeList.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ResumeManagementPage = () => (
  <PageLayoutWrapper className={'page'} style={{ display: 'flex' }}>
    <MyResumeListContainer />
  </PageLayoutWrapper>
);

export default ResumeManagementPage;
