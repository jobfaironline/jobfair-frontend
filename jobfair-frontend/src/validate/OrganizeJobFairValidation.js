import { DATE_RANGE_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const OrganizeJobFairValidation = {
  decorateRange: [
    REQUIRED_VALIDATOR('Decoration booth time range'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime())
  ],
  publicRange: [
    REQUIRED_VALIDATOR('Public time range'),
    DATE_RANGE_VALIDATOR(Date.now(), new Date(2025, 12, 12).getTime())
  ],
  name: [REQUIRED_VALIDATOR('Name'), MAX_LENGTH_VALIDATOR('Name', 300)]
};