import { EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, PHONE_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const AttendantRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  firstName: [REQUIRED_VALIDATOR('First name'), MAX_LENGTH_VALIDATOR('First name', 100)],
  middleName: [MAX_LENGTH_VALIDATOR('Middle name', 100)],
  lastName: [REQUIRED_VALIDATOR('Last name'), MAX_LENGTH_VALIDATOR('First name', 100)],
  phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
  password: [REQUIRED_VALIDATOR('Password')],
  rePassword: [
    REQUIRED_VALIDATOR('Confirm password'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) return Promise.resolve();

        return Promise.reject(new Error('Your confirm password does not match'));
      }
    })
  ]
};

export const CompanyRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  companyName: [REQUIRED_VALIDATOR('Company name')],
  taxId: [REQUIRED_VALIDATOR('Tax ID')],
  address: [REQUIRED_VALIDATOR('Address'), MAX_LENGTH_VALIDATOR('Address', 300)],
  description: [REQUIRED_VALIDATOR('Description'), MAX_LENGTH_VALIDATOR('Description', 5000)],
  url: [REQUIRED_VALIDATOR('Website')],
  phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
  password: [REQUIRED_VALIDATOR('Password')],
  rePassword: [
    REQUIRED_VALIDATOR('Confirm password'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) return Promise.resolve();

        return Promise.reject(new Error('Your confirm password does not match'));
      }
    })
  ],
  benefits: [REQUIRED_VALIDATOR('Company benefits')],
  categories: [REQUIRED_VALIDATOR('Company industries:')],
  sizeId: [REQUIRED_VALIDATOR('Company size')],
  firstName: [REQUIRED_VALIDATOR('First name'), MAX_LENGTH_VALIDATOR('First name', 100)],
  middleName: [MAX_LENGTH_VALIDATOR('Middle name', 100)],
  lastName: [REQUIRED_VALIDATOR('Last name'), MAX_LENGTH_VALIDATOR('Last name', 100)],
  gender: [REQUIRED_VALIDATOR('Gender')],
  department: [REQUIRED_VALIDATOR('Department')]
};
