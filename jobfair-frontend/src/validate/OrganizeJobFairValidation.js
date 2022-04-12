import { DATE_RANGE_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';
import moment from 'moment';

export const OrganizeJobFairValidation = {
  decorateRange: [
    REQUIRED_VALIDATOR('decorateRange'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime()),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const publicStartTime = moment(getFieldValue('publicRange')?.[0] ?? 0)
          .toDate()
          .getTime();
        const decorateEndTime = moment(value?.[1] ?? 0)
          .toDate()
          .getTime();
        if (
          decorateEndTime !== undefined &&
          (getFieldValue('publicRange') === undefined || publicStartTime > decorateEndTime)
        )
          return Promise.resolve();
        return Promise.reject(new Error('Decorate end time must be lower than public start time'));
      }
    })
  ],
  publicRange: [
    REQUIRED_VALIDATOR('publicRange'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime()),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const publicStartTime = moment(value?.[0] ?? 0)
          .toDate()
          .getTime();
        const decorateEndTime = moment(getFieldValue('decorateRange')?.[1] ?? 0)
          .toDate()
          .getTime();
        if (
          publicStartTime !== undefined &&
          (getFieldValue('decorateRange') === undefined || publicStartTime > decorateEndTime)
        )
          return Promise.resolve();
        return Promise.reject(new Error('Decorate end time must be lower than public start time'));
      }
    })
  ],
  name: [REQUIRED_VALIDATOR('Name'), MAX_LENGTH_VALIDATOR('Name', 300)]
};
