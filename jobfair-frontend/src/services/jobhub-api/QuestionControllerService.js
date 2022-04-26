import { CallAPI } from '../axiosBase';
import { ENDPOINT_QUESTION } from '../../constants/Endpoints/jobhub-api/QuestionControllerEndpoint';

export const getQuestionByJobPositionIdAndCriteria = ({
  direction = 'DESC',
  fromDate = '0',
  offset = '0',
  pageSize = '10',
  questionContent = '',
  sortBy = 'createDate',
  status = 'ACTIVE',
  toDate = '0',
  jobPositionId
}) =>
  CallAPI(
    `${ENDPOINT_QUESTION}/job-position/${jobPositionId}`,
    'GET',
    {},
    {
      direction,
      fromDate,
      offset,
      pageSize,
      questionContent,
      sortBy,
      status,
      toDate
    }
  );

export const updateQuestion = (body) => CallAPI(ENDPOINT_QUESTION, 'PUT', body);
export const createQuestion = (body) => CallAPI(ENDPOINT_QUESTION, 'POST', body);
export const deleteQuestion = (questionId) => CallAPI(`${ENDPOINT_QUESTION}/${questionId}`, 'DELETE');
export const uploadCSVFile = async (formData) =>
  CallAPI(`${ENDPOINT_QUESTION}/csv`, 'POST', formData, {}, { 'content-type': 'multipart/form-data' });
