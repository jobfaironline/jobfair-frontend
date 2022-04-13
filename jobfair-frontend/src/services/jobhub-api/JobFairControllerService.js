import { CallAPI } from '../axiosBase';
import { JOB_FAIR_END_POINT } from '../../constants/Endpoints/jobhub-api/JobFairConTrollerEndpoint';

export const getAllJobFairAPI = (direction = 'DESC', offset = '0', pageSize = '10', sortBy = 'createTime') =>
  CallAPI(
    `${JOB_FAIR_END_POINT}`,
    'GET',
    {},
    {
      direction,
      offset,
      pageSize,
      sortBy
    }
  );
export const searchJobFairAPI = (name, direction = 'DESC', offset = '0', pageSize = '10', sortBy = 'createTime') =>
  CallAPI(
    JOB_FAIR_END_POINT,
    'GET',
    {},
    {
      name,
      direction,
      offset,
      pageSize,
      sortBy
    }
  );

export const draftJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'POST', body, {});
export const updateJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'PUT', body, {});
export const publishJobFairAPI = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/publish/${jobFairId}`, 'POST', {}, {});
export const getJobFairByIDAPI = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/${jobFairId}`, 'GET');
export const uploadJobFairThumbnailAPI = (jobFairId, body) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}/upload-thumbnail/${jobFairId}`,
    'POST',
    body,
    {},
    { 'content-type': 'multipart/form-data' }
  );
