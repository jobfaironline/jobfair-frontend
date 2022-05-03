import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_LEAVE_JOB_FAIR,
  ENDPOINT_LEAVE_JOB_FAIR_BOOTH,
  ENDPOINT_VISIT_JOB_FAIR,
  ENDPOINT_VISIT_JOB_FAIR_BOOTH
} from '../../constants/Endpoints/jobhub-api/VisitControllerEndpoint';

export const visitJobFair = (jobFairId) => CallAPI(ENDPOINT_VISIT_JOB_FAIR, 'POST', {}, { jobFairId });
export const leaveJobFair = (jobFairId) => CallAPI(ENDPOINT_LEAVE_JOB_FAIR, 'POST', {}, { jobFairId });
export const visitJobFairBooth = (jobFairBoothId) =>
  CallAPI(ENDPOINT_VISIT_JOB_FAIR_BOOTH, 'POST', {}, { jobFairBoothId });
export const leaveJobFairBooth = (jobFairBoothId) =>
  CallAPI(ENDPOINT_LEAVE_JOB_FAIR_BOOTH, 'POST', {}, { jobFairBoothId });
