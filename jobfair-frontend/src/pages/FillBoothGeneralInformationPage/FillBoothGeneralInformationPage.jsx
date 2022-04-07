import './FillBoothGeneralInformationPage.styles.scss';
import { useParams } from 'react-router-dom';
import JobfairRegistrationForm from '../../containers/JobfairRegistrationForm/JobfairRegistrationForm.container';
import React from 'react';

const FillBoothGeneralInformationPage = () => {
  const { jobFairId } = useParams();

  return (
    <div className='page'>
      <div className='jobfair-registration-page'>
        <div className='jobfair-registration-cotnainer'>
          <JobfairRegistrationForm jobFairId={jobFairId} />
        </div>
      </div>
    </div>
  );
};

export default FillBoothGeneralInformationPage;
