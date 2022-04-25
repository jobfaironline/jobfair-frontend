import './CompanyProfilePage.scss';
import { CompanyProfileContainer } from '../../../containers/CompanyProfile/CompanyProfile.container';
import JobPositionManagementContainer from '../../../containers/JobPosition/JobPositionManagement.container';
import React from 'react';

const CompanyProfilePage = () => (
  <div className={'page company-profile-page'}>
    <div className={'company-profile'}>
      <CompanyProfileContainer />
    </div>
    <div className={'job-positions'}>
      <JobPositionManagementContainer />
    </div>
  </div>
);

export default CompanyProfilePage;
