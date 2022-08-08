import { MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const SubscriptionPlanValidation = {
  name: [REQUIRED_VALIDATOR('Name'), MAX_LENGTH_VALIDATOR('Name', 100)],
  price: [REQUIRED_VALIDATOR('Price')],
  description: [REQUIRED_VALIDATOR('Description'), MAX_LENGTH_VALIDATOR('Description', 300)],
  validPeriod: [REQUIRED_VALIDATOR('Valid date')],
  jobfairQuota: [REQUIRED_VALIDATOR('Total allow job fairs')]
};
