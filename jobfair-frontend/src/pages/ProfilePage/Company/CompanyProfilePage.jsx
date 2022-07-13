import './CompanyProfilePage.scss';
import { CompanyProfileContainer } from '../../../containers/CompanyProfile/CompanyProfile.container';
import JobPositionManagementContainer from '../../../containers/JobPosition/JobPositionManagement.container';
import PageLayoutWrapper from '../../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const CompanyProfilePage = () => (
  <PageLayoutWrapper className={'page company-profile-page'}>
    <div className={'company-profile'}>
      <CompanyProfileContainer />
    </div>
    <div className={'job-positions'}>
      <JobPositionManagementContainer />
    </div>
  </PageLayoutWrapper>
);

export default CompanyProfilePage;
