import { EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const EmployeeRegisterValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  firstName: [REQUIRED_VALIDATOR('First name'), MAX_LENGTH_VALIDATOR('First name', 100)],
  middleName: [MAX_LENGTH_VALIDATOR('Middle name', 100)],
  lastName: [REQUIRED_VALIDATOR('Last name'), MAX_LENGTH_VALIDATOR('Last name', 100)],
  department: [REQUIRED_VALIDATOR('Department'), MAX_LENGTH_VALIDATOR('Department', 100)],
  employeeId: [REQUIRED_VALIDATOR("Employee's id"), MAX_LENGTH_VALIDATOR("Employee's id", 40)]
};
