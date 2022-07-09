import { EditResumeContainer } from '../../containers/Resume/attendant/EditResume.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ResumeAddPage = () => (
  <PageLayoutWrapper className={'page'}>
    <EditResumeContainer />;
  </PageLayoutWrapper>
);
export default ResumeAddPage;
