import { CallAPI } from '../axiosBase';
import { JOB_FAIR_END_POINT } from '../../constants/Endpoints/jobhub-api/JobFairConTrollerEndpoint';

export const getJobFairAPI = (direction = 'ASC', offset = '0', pageSize = '10', sortBy = 'createTime') =>
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
export const searchJobFairAPI = (name, direction = 'ASC', offset = '0', pageSize = '10', sortBy = 'createTime') =>
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
