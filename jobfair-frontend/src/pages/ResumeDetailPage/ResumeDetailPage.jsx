import './ResumeDetailPage.styles.scss';
import { PageHeader } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import ResumeDetailForCompanyContainer from '../../containers/Resume/company/ResumeDetailForCompany.container';

const ResumeDetailPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { resumeId } = location.state;

  return (
    <div className='page'>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Resume Detail Page' />
      <ResumeDetailForCompanyContainer resumeId={resumeId} />
    </div>
  );
};
export default ResumeDetailPage;
