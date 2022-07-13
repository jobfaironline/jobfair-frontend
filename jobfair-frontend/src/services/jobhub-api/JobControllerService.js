import { CallAPI } from '../axiosBase';
import { ENDPOINT_JOB_CONTROLLER } from '../../constants/Endpoints/jobhub-api/JobControllerEndpoint';

export const createJobPositionsAPI = (data) => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'POST', data);
export const getJobPositionsAPI = (direction, offset, pageSize, sortBy, jobTitle) =>
  CallAPI(
    `${ENDPOINT_JOB_CONTROLLER}`,
    'GET',
    {},
    {
      direction,
      offset,
      pageSize,
      sortBy,
      jobTitle
    }
  );
export const updateJobPositionAPI = (body, id) => CallAPI(`${ENDPOINT_JOB_CONTROLLER}/${id}`, 'PUT', body);
export const deleteJobPositionAPI = (id) => CallAPI(`${ENDPOINT_JOB_CONTROLLER}/${id}`, 'DELETE');
export const uploadCSVFile = async (formData) =>
  CallAPI(`${ENDPOINT_JOB_CONTROLLER}/csv`, 'POST', formData, {}, { 'content-type': 'multipart/form-data' });
export const getJobPositionByIDAPI = (id) => CallAPI(`${ENDPOINT_JOB_CONTROLLER}/${id}`, 'GET');
