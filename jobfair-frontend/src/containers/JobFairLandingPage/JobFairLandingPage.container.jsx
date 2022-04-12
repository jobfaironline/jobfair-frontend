import { uploadProps } from '../../constants/JobFairConst';
import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';
import React from 'react';

const JobFairLandingPageContainer = ({ form, onFinish, onHandleNext, onHandlePrev }) => (
  <JobFairLandingPageFormComponent
    form={form}
    onFinish={onFinish}
    onHandleNext={onHandleNext}
    onHandlePrev={onHandlePrev}
    {...uploadProps}
  />
);

export default JobFairLandingPageContainer;
