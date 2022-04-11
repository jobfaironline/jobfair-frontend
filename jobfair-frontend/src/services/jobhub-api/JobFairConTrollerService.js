import { CallAPI } from '../axiosBase';
import { JOB_FAIR_END_POINT } from '../../constants/Endpoints/jobhub-api/JobFairConTrollerEndpoint';

export const draftJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'POST', body, {});
export const updateJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'PUT', body, {});