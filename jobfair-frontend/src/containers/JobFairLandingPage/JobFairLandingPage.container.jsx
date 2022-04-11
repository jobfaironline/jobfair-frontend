import React from 'react';
import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';

const JobFairLandingPageContainer = ({ form, onFinish, onHandleNext, onHandlePrev }) => {
  return (
    <JobFairLandingPageFormComponent
      form={form}
      onFinish={onFinish}
      onHandleNext={onHandleNext}
      onHandlePrev={onHandlePrev}
    />
  );
};

export default JobFairLandingPageContainer;