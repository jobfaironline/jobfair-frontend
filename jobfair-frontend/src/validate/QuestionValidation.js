import { MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const QuestionValidation = {
  questionContent: [REQUIRED_VALIDATOR('Content'), MAX_LENGTH_VALIDATOR('Content', 100)],
  answerContent: [REQUIRED_VALIDATOR(`Answer's content`), MAX_LENGTH_VALIDATOR("Answer's content", 100)]
};
