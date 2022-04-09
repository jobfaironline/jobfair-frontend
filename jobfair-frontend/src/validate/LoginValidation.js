import { EMAIL_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const LoginValidation = {
  email: [REQUIRED_VALIDATOR('email'), ...EMAIL_VALIDATOR()],
  password: [REQUIRED_VALIDATOR('Password')]
};
