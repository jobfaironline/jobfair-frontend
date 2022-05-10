import { EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const EmployeeRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  firstName: [REQUIRED_VALIDATOR('First name')],
  middleName: [],
  lastName: [REQUIRED_VALIDATOR('Last name')],
  department: [REQUIRED_VALIDATOR('Department'), MAX_LENGTH_VALIDATOR('Department', 100)],
  employeeId: [REQUIRED_VALIDATOR("Employee's id"), MAX_LENGTH_VALIDATOR("Employee's id", 40)]
};
