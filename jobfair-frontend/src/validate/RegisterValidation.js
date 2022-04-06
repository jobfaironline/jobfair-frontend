import {
  EMAIL_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
  PHONE_VALIDATOR,
  REQUIRED_VALIDATOR
} from './GeneralValidation'

export const AttendantRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  firstName: [REQUIRED_VALIDATOR('First name')],
  middleName: [],
  lastName: [REQUIRED_VALIDATOR('Last name')],
  phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
  gender: [REQUIRED_VALIDATOR('Gender')],
  password: [REQUIRED_VALIDATOR('Password')],
  rePassword: [
    REQUIRED_VALIDATOR('Confirm password'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Your confirm password does not match'))
      }
    })
  ]
}

export const CompanyRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  companyName: [REQUIRED_VALIDATOR('Company name')],
  taxId: [REQUIRED_VALIDATOR('Tax ID')],
  address: [
    REQUIRED_VALIDATOR('Address'),
    MAX_LENGTH_VALIDATOR('Address', 300)
  ],
  phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
  password: [REQUIRED_VALIDATOR('Password')],
  rePassword: [
    REQUIRED_VALIDATOR('Confirm password'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Your confirm password does not match'))
      }
    })
  ]
}
