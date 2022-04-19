import { CallAPI } from '../axiosBase';
import { ENDPOINT_JOB_FAIR_BOOTH } from '../../constants/Endpoints/jobhub-api/JobFairBoothControllerEndpoint';

export const getJobFairBoothByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_JOB_FAIR_BOOTH}`, 'GET', {}, { jobFairId });
export const getCompanyBoothById = (companyBoothId) =>
  CallAPI(`${ENDPOINT_JOB_FAIR_BOOTH}/${companyBoothId}`, 'GET', {}, {});
export const assignJobPositionToBooth = (body) => CallAPI(`${ENDPOINT_JOB_FAIR_BOOTH}`, 'POST', body, {});
