import React from 'react';
import ScheduleJobFairFormComponent from '../../../components/forms/ScheduleJobFairForm/ScheduleJobFairForm.component';

const ScheduleJobFairFormContainer = ({ onFinish, form, onHandleNext, onHandlePrev, onValueChange, isError }) => (
  <ScheduleJobFairFormComponent
    onFinish={onFinish}
    form={form}
    onHandleNext={onHandleNext}
    onHandlePrev={onHandlePrev}
    onValueChange={onValueChange}
    isError={isError}
  />
);

export default ScheduleJobFairFormContainer;
