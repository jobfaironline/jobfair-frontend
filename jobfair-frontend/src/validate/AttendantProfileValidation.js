import {REGEX_EMAIL} from "../constants/ApplicationConst";
import {PHONE_REGEX} from "../constants/RegexConstant";

export const AttendantProfileValidation = {
  account: {
    email: [
      {
        required: true,
        message: 'This field is required',
      },
      {
        max: 322,
        message: 'This field has max length is 322 characters',
      },
      {
        type: 'email',
        message: 'This field is not valid E-mail!',
      },
    ],
    phone: [
      {
        required: true,
        message: 'This field is required',
      },
      {
        max: 11,
        message: 'This field has max length is 11 characters',
      },
      {
        pattern: PHONE_REGEX,
        message: 'This field is not valid phone.'
      }
    ],
    dob: [
      {
        required: true,
        message: 'This field is required',
      },
    ],
    firstname: [{ required: true, message: 'First name is required' }],
    middlename: [{ required: true, message: 'Middle name is required' }],
    lastname: [{ required: true, message: 'Last name is required' }],
  },
  address: [
    {
      required: true,
      message: 'This field is required',
    },
  ],
  yearOfExp: [
    {
      required: true,
      message: 'This field is required',
    },
    () => ({
      validator(_, value) {
        if (!value || value >= 50) {
          console.log(value)
          return Promise.reject(
            new Error('The maximum year of experience is 50 years')
          )
        }

        return Promise.resolve()
      },
    }),
  ],
  title: [{ required: true, message: 'Title is required' }],
  jobTitle: [{ required: true, message: 'Job title is required' }],
  skills: {
    name: [{ required: true, message: 'Missing name' }],
  },
  workHistories: {
    company: [{ required: true, message: 'Missing company' }],
    description: [{ required: true, message: 'Missing description' }],
    fromDate: [{ required: true, message: 'Missing fromDate' }],
    toDate: [{ required: true, message: 'Missing toDate' }],
    position: [{ required: true, message: 'Missing position' }],
    range: [{required: true, message: 'Missing date range'}]
  },
  educations: {
    subject: [{ required: true, message: 'Missing subject' }],
    school: [{ required: true, message: 'Missing school' }],
    fromDate: [{ required: true, message: 'Missing fromDate' }],
    toDate: [{ required: true, message: 'Missing toDate' }],
    achievement: [{ required: true, message: 'Missing achievement' }],
  },
  certifications: {
    name: [{ required: true, message: 'Missing name' }],
    institution: [{ required: true, message: 'Missing institution' }],
    year: [
      { required: true, message: 'Missing year' },
      () => ({
        validator(_, value) {
          if (!value || value <= 1940) {
            return Promise.reject(new Error('The minimum year is 1940 years'))
          }
          return Promise.resolve()
        },
      }),
    ],
    certificationLink: [
      { required: true, message: 'Missing certification link' },
      { type: 'url', message: 'This field is invalid url'}
    ],
  },
  references: {
    company: [{ required: true, message: 'Missing company' }],
    email: [{ required: true, message: 'Missing email' }, {type: 'email', message: 'This field is invalid email.'}],
    fullname: [{ required: true, message: 'Missing fullname' }],
    phone: [{ required: true, message: 'Missing phone' }, {pattern: PHONE_REGEX, message: 'This field is invalid phone.'}],
    position: [{ required: true, message: 'Missing position' }],
  },
  activities: {
    name: [{ required: true, message: 'Missing name' }],
    functionTitle: [{ required: true, message: 'Missing functionTitle' }],
    organization: [{ required: true, message: 'Missing organization' }],
    fromDate: [{ required: true, message: 'Missing fromDate' }],
    toDate: [{ required: true, message: 'Missing toDate' }],
    description: [{ required: true, message: 'Missing description' }],
  },
}