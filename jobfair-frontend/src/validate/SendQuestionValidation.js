import { EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const SendQuestionValidation = {
  email: [REQUIRED_VALIDATOR('Email'), ...EMAIL_VALIDATOR()],
  question: [REQUIRED_VALIDATOR('Câu hỏi'), MAX_LENGTH_VALIDATOR('Câu hỏi', 1000)]
};
