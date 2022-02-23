import { DateFormat, MinimumDateOfBirth, REGEX_EMAIL } from '../constants/ApplicationConst'
import { PHONE_REGEX } from '../constants/RegexConstant'
import moment from 'moment'
import { convertToDateString } from '../utils/common'

export const AttendantProfileValidation = {
  account: {
    email: [
      {
        required: true,
        message: 'This field is required'
      },
      {
        max: 322,
        message: 'This field has max length is 322 characters'
      },
      {
        type: 'email',
        message: 'This field is not valid E-mail!'
      }
    ],
    countryId: [
      {
        required: true,
        message: 'This field is required'
      }
    ],
    phone: [
      {
        required: true,
        message: 'This field is required'
      },
      {
        max: 11,
        message: 'This field has max length is 11 characters'
      },
      {
        pattern: PHONE_REGEX,
        message: 'This field is not valid phone.'
      }
    ],
    dob: [
      {
        required: true,
        message: 'This field is required'
      },
      () => ({
        validator(_, value) {
          const dateValue = moment(value).toDate().getTime()
          if (!value || dateValue >= Date.parse(MinimumDateOfBirth)) {
            return Promise.reject(new Error('Age restriction required: at least 18 years'))
          }
          return Promise.resolve()
        }
      })
    ],
    firstname: [{ required: true, message: 'First name is required' }],
    middlename: [{ required: true, message: 'Middle name is required' }],
    lastname: [{ required: true, message: 'Last name is required' }]
  },
  address: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 300,
      message: 'This field has max length is 300 characters'
    }
  ],
  yearOfExp: [
    {
      required: true,
      message: 'This field is required'
    },
    () => ({
      validator(_, value) {
        if (!value || value >= 50) {
          return Promise.reject(new Error('The maximum year of experience is 50 years'))
        }
        if (value < 0) {
          return Promise.reject(new Error('The minimum year of experience is 0 years'))
        }

        return Promise.resolve()
      }
    })
  ],
  title: [{ required: true, message: 'Title is required' }],
  jobTitle: [{ required: true, message: 'Job title is required' }],
  skills: {
    name: [{ required: true, message: 'Missing name' }]
  },
  workHistories: {
    company: [{ required: true, message: 'Missing company' }],
    description: [{ required: true, message: 'Missing description' }],
    position: [{ required: true, message: 'Missing position' }],
    range: [
      { required: true, message: 'Missing date range' },
      () => ({
        validator(_, value) {
          const fromDate = moment(value[0]).toDate().getTime()
          const toDate = moment(value[1]).toDate().getTime()
          if (!value) {
            return Promise.reject(new Error('This field is required'))
          }
          if (fromDate >= Date.now()) {
            return Promise.reject(new Error('From date must be lower than today'))
          }
          if (toDate >= Date.now()) {
            return Promise.reject(new Error('To date must be lower than today'))
          }
          return Promise.resolve()
        }
      })
    ]
  },
  educations: {
    subject: [{ required: true, message: 'Missing subject' }],
    school: [{ required: true, message: 'Missing school' }],
    achievement: [{ required: true, message: 'Missing achievement' }]
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
          if (value > new Date().getFullYear()) {
            return Promise.reject(new Error('The year must lower than current year'))
          }
          return Promise.resolve()
        }
      })
    ],
    certificationLink: [
      { required: true, message: 'Missing certification link' },
      { type: 'url', message: 'This field is invalid url' }
    ]
  },
  references: {
    company: [{ required: true, message: 'Missing company' }],
    email: [
      { required: true, message: 'Missing email' },
      { type: 'email', message: 'This field is invalid email.' }
    ],
    fullname: [{ required: true, message: 'Missing fullname' }],
    phone: [
      { required: true, message: 'Missing phone' },
      {
        pattern: PHONE_REGEX,
        message: 'This field is invalid phone.'
      }
    ],
    position: [{ required: true, message: 'Missing position' }]
  },
  activities: {
    name: [{ required: true, message: 'Missing name' }],
    functionTitle: [{ required: true, message: 'Missing functionTitle' }],
    organization: [{ required: true, message: 'Missing organization' }],
    fromDate: [{ required: true, message: 'Missing fromDate' }],
    toDate: [{ required: true, message: 'Missing toDate' }],
    description: [{ required: true, message: 'Missing description' }]
  }
}
