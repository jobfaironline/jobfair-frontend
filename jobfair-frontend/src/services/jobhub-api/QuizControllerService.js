import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_IN_PROGRESS_QUIZ,
  ENDPOINT_QUIZ,
  ENDPOINT_SAVE_QUIZ,
  ENDPOINT_SUBMIT_QUIZ
} from '../../constants/Endpoints/jobhub-api/QuizControllerEndpoint';

export const createQuiz = (applicationId) => CallAPI(ENDPOINT_QUIZ, 'POST', {}, { applicationId });
export const getInProgressQuiz = (quizId) => CallAPI(`${ENDPOINT_IN_PROGRESS_QUIZ}/${quizId}`, 'GET');
export const saveQuiz = (quizId, body) => CallAPI(`${ENDPOINT_SAVE_QUIZ}/${quizId}`, 'POST', body);
export const submitQuiz = (quizId) => CallAPI(`${ENDPOINT_SUBMIT_QUIZ}/${quizId}`, 'POST');
