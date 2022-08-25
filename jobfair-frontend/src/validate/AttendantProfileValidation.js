import {
  DATE_RANGE_VALIDATOR,
  EMAIL_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
  NAME_VALIDATOR,
  PHONE_VALIDATOR,
  REQUIRED_VALIDATOR,
  URL_VALIDATOR,
  YEAR_VALIDATOR
} from './GeneralValidation';
import { MinimumDateOfBirth } from '../constants/ApplicationConst';
import moment from 'moment';

export const AccountProfileValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  phone: [REQUIRED_VALIDATOR('Phone'), ...PHONE_VALIDATOR()],
  firstname: [REQUIRED_VALIDATOR('First name'), MAX_LENGTH_VALIDATOR('First name', 100), NAME_VALIDATOR('First name')],
  middlename: [MAX_LENGTH_VALIDATOR('Middle name', 100), NAME_VALIDATOR('Middle name')],
  lastname: [REQUIRED_VALIDATOR('Last name'), MAX_LENGTH_VALIDATOR('Last name', 100), NAME_VALIDATOR('Last name')]
};

export const AttendantProfileValidation = {
  account: {
    countryId: [REQUIRED_VALIDATOR('Country')],
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
    ]
  },
  address: [REQUIRED_VALIDATOR('Address'), MAX_LENGTH_VALIDATOR('Address', 1000)],
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
  title: [REQUIRED_VALIDATOR('Title'), MAX_LENGTH_VALIDATOR('Title', 100)],
  jobTitle: [REQUIRED_VALIDATOR('Job title'), MAX_LENGTH_VALIDATOR('Job title', 100)],
  skills: {
    name: [REQUIRED_VALIDATOR('Skill name'), MAX_LENGTH_VALIDATOR('Skill name', 100)]
  },
  workHistories: {
    company: [REQUIRED_VALIDATOR('Company'), MAX_LENGTH_VALIDATOR('Company', 100)],
    description: [REQUIRED_VALIDATOR('Description'), MAX_LENGTH_VALIDATOR('Description', 5000)],
    position: [REQUIRED_VALIDATOR('Position'), MAX_LENGTH_VALIDATOR('Position', 100)],
    range: [REQUIRED_VALIDATOR('Date range'), DATE_RANGE_VALIDATOR(new Date(1940, 0, 1).getTime(), Date.now())]
  },
  educations: {
    subject: [REQUIRED_VALIDATOR('Subject'), MAX_LENGTH_VALIDATOR('Subject', 100)],
    school: [REQUIRED_VALIDATOR('School'), MAX_LENGTH_VALIDATOR('School', 100)],
    achievement: [MAX_LENGTH_VALIDATOR('Achievement', 5000)],
    range: [REQUIRED_VALIDATOR('Date range'), DATE_RANGE_VALIDATOR(new Date(1940, 0, 1).getTime(), Date.now())]
  },
  certifications: {
    name: [REQUIRED_VALIDATOR("Certificate's name"), MAX_LENGTH_VALIDATOR('Name', 1000)],
    institution: [REQUIRED_VALIDATOR('Institution'), MAX_LENGTH_VALIDATOR('Institution', 100)],
    issueDate: [YEAR_VALIDATOR(1940, new Date().getFullYear())],
    certificationLink: [REQUIRED_VALIDATOR("Certificate's link"), ...URL_VALIDATOR()]
  },
  references: {
    company: [REQUIRED_VALIDATOR("Reference's company"), MAX_LENGTH_VALIDATOR('Company', 1000)],
    email: [REQUIRED_VALIDATOR("Reference's email"), ...EMAIL_VALIDATOR()],
    fullname: [REQUIRED_VALIDATOR("Reference's full name"), MAX_LENGTH_VALIDATOR('Name', 1000)],
    phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
    position: [REQUIRED_VALIDATOR("Reference's position"), MAX_LENGTH_VALIDATOR('Position', 100)]
  },
  activities: {
    name: [REQUIRED_VALIDATOR("Activity's name"), MAX_LENGTH_VALIDATOR('Name', 100)],
    functionTitle: [REQUIRED_VALIDATOR('Function title'), MAX_LENGTH_VALIDATOR('Title', 100)],
    organization: [REQUIRED_VALIDATOR('Organization'), MAX_LENGTH_VALIDATOR('Organization', 100)],
    fromDate: [REQUIRED_VALIDATOR('From date')],
    toDate: [REQUIRED_VALIDATOR('To date')],
    description: [REQUIRED_VALIDATOR("Activity's description"), MAX_LENGTH_VALIDATOR('Description', 5000)]
  }
};
