import { PHONE_REGEX } from '../constants/RegexConstant';
import { convertToDateString } from '../utils/common';
import moment from 'moment';

export const REQUIRED_VALIDATOR = (fieldName) => ({
  required: true,
  message: `${fieldName} is required.`
});

export const MAX_LENGTH_VALIDATOR = (fieldName, maxValue) => ({
  max: maxValue,
  message: `${fieldName} has max value of length is ${maxValue}`
});

export const MIN_LENGTH_VALIDATOR = (fieldName, minValue) => ({
  min: minValue,
  message: `${fieldName} has min value of length is ${minValue}`
});

export const EMAIL_VALIDATOR = () => [
  {
    max: 322,
    message: `Email has max value of length is 322`
  },
  {
    type: 'email',
    message: 'This field is not valid E-mail!'
  }
];

export const PHONE_VALIDATOR = () => [
  {
    max: 11,
    message: `Phone number has max value of length is 11`
  },
  {
    pattern: PHONE_REGEX,
    message: 'This phone number is not valid!'
  }
];

export const URL_VALIDATOR = () => [
  {
    max: 2048,
    message: `URL has max value of length is 2048`
  },
  {
    type: 'url',
    message: 'This url is not valid!'
  }
];

export const NUMBER_RANGE_VALIDATOR = (minValue, maxValue) => () => ({
  validator(_, value) {
    const num = parseInt(value);
    if (!/^\d+$/.test(value)) return Promise.reject(new Error(`Invalid number value`));

    if (!value || num > maxValue) return Promise.reject(new Error(`The maximum of position is ${maxValue}`));

    if (num < minValue) return Promise.reject(new Error(`The minimum of position is ${minValue}`));

    return Promise.resolve();
  }
});

export const DATE_RANGE_VALIDATOR = (minTime, maxTime) => () => ({
  validator(_, value) {
    const fromDate = moment(value[0]).toDate().getTime();
    const toDate = moment(value[1]).toDate().getTime();
    if (fromDate > maxTime)
      return Promise.reject(new Error(`From date must be lower than ${convertToDateString(maxTime)}`));

    if (toDate > maxTime)
      return Promise.reject(new Error(`To date must be lower than ${convertToDateString(maxTime)}`));

    if (fromDate < minTime)
      return Promise.reject(new Error(`From date must be higher than ${convertToDateString(minTime)}`));

    if (toDate < minTime)
      return Promise.reject(new Error(`To date must be higher than ${convertToDateString(minTime)}`));

    if (toDate < fromDate) return Promise.reject(new Error('Invalid date range'));

    return Promise.resolve();
  }
});

export const YEAR_VALIDATOR = (minYear, maxYear) => () => ({
  validator(_, value) {
    if (!value || value < minYear) return Promise.reject(new Error(`The minimum year is ${minYear} years`));

    if (value > maxYear) return Promise.reject(new Error(`The year must lower than ${maxYear}`));

    return Promise.resolve();
  }
});
