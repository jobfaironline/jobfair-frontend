import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';
import React from 'react';

const JobFairLandingPageContainer = ({ onFinish, form, onHandleNext, onHandlePrev }) => {
  const uploadProps = {};
  return (
    <JobFairLandingPageFormComponent
      form={form}
      onFinish={onFinish}
      onHandleNext={onHandleNext}
      onHandlePrev={onHandlePrev}
      {...uploadProps}
    />
  );
};

export default JobFairLandingPageContainer;
