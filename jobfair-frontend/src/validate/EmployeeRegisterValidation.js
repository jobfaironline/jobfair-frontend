import { EMAIL_VALIDATOR, PHONE_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const EmployeeRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  firstName: [REQUIRED_VALIDATOR('First name')],
  middleName: [],
  lastName: [REQUIRED_VALIDATOR('Last name')],
  phone: [REQUIRED_VALIDATOR('Phone number'), ...PHONE_VALIDATOR()],
  gender: [REQUIRED_VALIDATOR('Gender')]
};
