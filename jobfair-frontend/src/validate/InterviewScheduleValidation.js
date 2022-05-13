import { REQUIRED_VALIDATOR } from './GeneralValidation';
import moment from 'moment';

export const InterviewScheduleValidation = {
  interviewDate: [REQUIRED_VALIDATOR('Interview date')],
  startTime: [
    REQUIRED_VALIDATOR('Start time'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const startTime = moment(value ?? 0)
          .toDate()
          .getTime();
        const endTime = moment(getFieldValue('timeEnd') ?? 0)
          .toDate()
          .getTime();
        if (startTime !== undefined && (getFieldValue('timeEnd') === undefined || startTime < endTime))
          return Promise.resolve();
        return Promise.reject(new Error('Start Time cannot be greater than the End Time'));
      }
    })
  ],
  endTime: [
    REQUIRED_VALIDATOR('End time'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const endTime = moment(value ?? 0)
          .toDate()
          .getTime();
        const startTime = moment(getFieldValue('timeStart') ?? 0)
          .toDate()
          .getTime();
        if (endTime !== undefined && (getFieldValue('timeStart') === undefined || endTime > startTime))
          return Promise.resolve();
        return Promise.reject(new Error('End Time cannot be lower than the Start Time'));
      }
    })
  ],
  reason: [REQUIRED_VALIDATOR('Reason')]
};
