import './ResumeDetailPage.styles.scss';
import { PageHeader } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import ResumeDetailForCompanyContainer from '../../containers/Resume/company/ResumeDetailForCompany.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const ResumeDetailPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { resumeId } = location.state;

  return (
    <PageLayoutWrapper className='page'>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Resume Detail Page' />
      <ResumeDetailForCompanyContainer resumeId={resumeId} />
    </PageLayoutWrapper>
  );
};
export default ResumeDetailPage;
