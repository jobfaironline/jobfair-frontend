import { CallAPI } from '../axiosBase';
import { ENDPOINT_GET_JOB_FAIR_BOOTH } from '../../constants/Endpoints/jobhub-api/CompanyBoothControllerEndpoint';

export const getCompanyBoothByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_JOB_FAIR_BOOTH}?jobFairId=${jobFairId}`, 'GET');
export const getCompanyBoothById = (boothId) => CallAPI(`${ENDPOINT_GET_JOB_FAIR_BOOTH}/${boothId}`, 'GET');
