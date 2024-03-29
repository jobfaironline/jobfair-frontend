import { EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const JobPositionValidation = {
  title: [REQUIRED_VALIDATOR('Title'), MAX_LENGTH_VALIDATOR('Title', 100)],
  jobLevel: [REQUIRED_VALIDATOR('Job level')],
  jobType: [REQUIRED_VALIDATOR('Job type')],
  language: [REQUIRED_VALIDATOR('Language')],
  skillTags: [REQUIRED_VALIDATOR('Skill tag')],
  jobCategory: [REQUIRED_VALIDATOR('Job category')],
  description: [REQUIRED_VALIDATOR('Description'), MAX_LENGTH_VALIDATOR('Description', 5000)],
  requirements: [REQUIRED_VALIDATOR('Requirements'), MAX_LENGTH_VALIDATOR('Requirements', 5000)],
  contactPerson: [REQUIRED_VALIDATOR('Contact person'), MAX_LENGTH_VALIDATOR('Contact person', 100)],
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()]
};
