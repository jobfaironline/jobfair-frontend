import { EMAIL_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const ChangePasswordValidation = {
  email: [REQUIRED_VALIDATOR('email'), ...EMAIL_VALIDATOR()],
  oldPassword: [REQUIRED_VALIDATOR('Old password')],
  newPassword: [REQUIRED_VALIDATOR('New password')],
  rePassword: [
    REQUIRED_VALIDATOR('Confirm password'),
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('newPassword') === value) return Promise.resolve();

        return Promise.reject(new Error('Your confirm password does not match'));
      }
    })
  ]
};
