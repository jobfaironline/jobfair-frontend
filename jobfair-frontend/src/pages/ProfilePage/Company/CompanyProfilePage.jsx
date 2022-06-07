import './CompanyProfilePage.scss';
import { Button } from 'antd';
import { CompanyProfileContainer } from '../../../containers/CompanyProfile/CompanyProfile.container';
import CompanyProfileFormContainer from '../../../containers/forms/CompanyProfileForm/CompanyProfileForm.container';
import JobPositionManagementContainer from '../../../containers/JobPosition/JobPositionManagement.container';
import React, { useState } from 'react';

const CompanyProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className={'page company-profile-page'}>
      <div className={'company-profile'}>
        <Button
          style={{ marginLeft: 'auto', marginRight: '5rem' }}
          className={'button'}
          onClick={() => setIsEditable(true)}>
          Edit
        </Button>
        <Button onClick={() => setIsEditable(false)}>Cancel</Button>
        {isEditable ? <CompanyProfileFormContainer /> : <CompanyProfileContainer />}
      </div>
      <div className={'job-positions'}>
        <JobPositionManagementContainer />
      </div>
    </div>
  );
};

export default CompanyProfilePage;
