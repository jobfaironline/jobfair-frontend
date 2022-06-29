import {
  DATE_RANGE_VALIDATOR,
  EMAIL_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
  PHONE_VALIDATOR,
  REQUIRED_VALIDATOR,
  URL_VALIDATOR,
  YEAR_VALIDATOR
} from './GeneralValidation';
import { MinimumDateOfBirth } from '../constants/ApplicationConst';
import moment from 'moment';

export const AttendantProfileValidation = {
  account: {
    email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
    countryId: [REQUIRED_VALIDATOR('Country')],
    phone: [REQUIRED_VALIDATOR('Phone'), ...PHONE_VALIDATOR()],
    dob: [
      REQUIRED_VALIDATOR('Birthday'),
      () => ({
        validator(_, value) {
          const current = moment();
          if (!value || current.diff(value, 'years', true) < MinimumDateOfBirth)
            return Promise.reject(new Error('Age restriction required: at least 18 years'));

          return Promise.resolve();
        }
      })
    ],
    firstname: [REQUIRED_VALIDATOR('First name')],
    middlename: [],
    lastname: [REQUIRED_VALIDATOR('Last name')]
  },
  address: [REQUIRED_VALIDATOR('Address'), MAX_LENGTH_VALIDATOR('Address', 300)],
  yearOfExp: [
    REQUIRED_VALIDATOR('Year of experience'),
    () => ({
      validator(_, value) {
        if (!value || value > 50) return Promise.reject(new Error('The maximum year of experience is 50 years'));

        if (value < 0) return Promise.reject(new Error('The minimum year of experience is 0 years'));

        return Promise.resolve();
      }
    })
  ],
  title: [REQUIRED_VALIDATOR('Title')],
  jobTitle: [REQUIRED_VALIDATOR('Job title')],
  skills: {
    name: [REQUIRED_VALIDATOR('Skill name')]
  },
  workHistories: {
    company: [REQUIRED_VALIDATOR('Company')],
    description: [REQUIRED_VALIDATOR('Description')],
    position: [REQUIRED_VALIDATOR('Position')],
    range: [REQUIRED_VALIDATOR('Date range'), DATE_RANGE_VALIDATOR(new Date(1940, 0, 1).getTime(), Date.now())]
  },
  educations: {
    subject: [REQUIRED_VALIDATOR('Subject')],
    school: [REQUIRED_VALIDATOR('School')],
    achievement: [REQUIRED_VALIDATOR('Achievement')],
    range: [REQUIRED_VALIDATOR('Date range'), DATE_RANGE_VALIDATOR(new Date(1940, 0, 1).getTime(), Date.now())]
  },
  certifications: {
    name: [REQUIRED_VALIDATOR("Certificate's name")],
    institution: [REQUIRED_VALIDATOR('Institution')],
    issueDate: [YEAR_VALIDATOR(1940, new Date().getFullYear())],
    certificationLink: [REQUIRED_VALIDATOR("Certificate's link"), ...URL_VALIDATOR()]
  },
  references: {
    company: [REQUIRED_VALIDATOR("Reference's company")],
    email: [REQUIRED_VALIDATOR("Reference's email"), ...EMAIL_VALIDATOR()],
    fullname: [REQUIRED_VALIDATOR("Reference's full name")],
    phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
    position: [REQUIRED_VALIDATOR("Reference's position")]
  },
  activities: {
    name: [REQUIRED_VALIDATOR("Activity's name")],
    functionTitle: [REQUIRED_VALIDATOR('Function title')],
    organization: [REQUIRED_VALIDATOR('Organization')],
    fromDate: [REQUIRED_VALIDATOR('From date')],
    toDate: [REQUIRED_VALIDATOR('To date')],
    description: [REQUIRED_VALIDATOR("Activity's description")]
  }
};
