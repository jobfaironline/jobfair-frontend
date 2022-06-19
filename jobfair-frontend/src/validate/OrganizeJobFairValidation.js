import { DATE_RANGE_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';
import moment from 'moment';

export const OrganizeJobFairValidation = {
  morningShift: [
    REQUIRED_VALIDATOR('Morning shift'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const afternoonShift = getFieldValue('afternoonShift');
        const morningShift = value;
        if (afternoonShift === undefined || morningShift === undefined) return Promise.resolve();
        if (
          afternoonShift[0] === undefined ||
          afternoonShift[0] === undefined ||
          morningShift[0] === undefined ||
          morningShift[1] === undefined
        )
          return Promise.resolve();

        const startOfDate = moment().startOf('day');
        const afterNoonShiftStartTime = moment(afternoonShift[0]);
        const morningShiftStartTime = moment(morningShift[0]);
        const morningShiftEndTime = moment(morningShift[1]);
        if (morningShiftStartTime.unix() >= morningShiftEndTime.unix())
          return Promise.reject(new Error('Morning shift begin time must be lower than morning shift end time'));

        if (afterNoonShiftStartTime.unix() - startOfDate.unix() < morningShiftEndTime.unix() - startOfDate.unix())
          return Promise.reject(new Error('Morning shift time must be lower than afternoon shift time'));
        return Promise.resolve();
      }
    })
  ],
  afternoonShift: [
    REQUIRED_VALIDATOR('Afternoon shift'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const morningShift = getFieldValue('morningShift');
        const afternoonShift = value;
        if (afternoonShift === undefined || morningShift === undefined) return Promise.resolve();
        if (
          afternoonShift[0] === undefined ||
          afternoonShift[0] === undefined ||
          morningShift[0] === undefined ||
          morningShift[1] === undefined
        )
          return Promise.resolve();

        const startOfDate = moment().startOf('day');
        const afterNoonShiftStartTime = moment(afternoonShift[0]);
        const afterNoonShiftEndTime = moment(afternoonShift[1]);

        const morningShiftEndTime = moment(morningShift[1]);

        if (afterNoonShiftStartTime.unix() >= afterNoonShiftEndTime.unix())
          return Promise.reject(new Error('Afternoon shift begin time must be lower than afternoon shift end time'));
        if (afterNoonShiftStartTime.unix() - startOfDate.unix() < morningShiftEndTime.unix() - startOfDate.unix())
          return Promise.reject(new Error('Morning shift time must be lower than afternoon shift time'));
        return Promise.resolve();
      }
    })
  ],
  decorateRange: [
    REQUIRED_VALIDATOR('Decorate time'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime()),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const decorateRange = value;
        const publicRange = getFieldValue('publicRange');
        if (!decorateRange || !publicRange) return Promise.resolve();

        const decorateEndTime = moment(decorateRange[1]);
        const publicStartTime = moment(publicRange[0]);
        if (decorateEndTime > publicStartTime)
          return Promise.reject(new Error('Decorate end time must be lower than public start time'));
        return Promise.resolve();
      }
    })
  ],
  publicRange: [
    REQUIRED_VALIDATOR('Public time'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime()),
    ({ getFieldValue }) => ({
      validator(_, value) {
        const publicRange = value;
        const decorateRange = getFieldValue('decorateRange');
        if (!decorateRange || !publicRange) return Promise.resolve();

        const decorateEndTime = moment(decorateRange[1]);
        const publicStartTime = moment(publicRange[0]);
        if (decorateEndTime > publicStartTime)
          return Promise.reject(new Error('Decorate end time must be lower than public start time'));
        return Promise.resolve();
      }
    })
  ],
  name: [REQUIRED_VALIDATOR('Name'), MAX_LENGTH_VALIDATOR('Name', 300)],
  hostname: [REQUIRED_VALIDATOR('Host name'), MAX_LENGTH_VALIDATOR('Name', 300)],
  description: [REQUIRED_VALIDATOR('Description'), MAX_LENGTH_VALIDATOR('Name', 3000)],
  thumbnail: [REQUIRED_VALIDATOR('Thumbnail')],
  targetAttendant: [REQUIRED_VALIDATOR('Host name'), MAX_LENGTH_VALIDATOR('Name', 300)]
};
