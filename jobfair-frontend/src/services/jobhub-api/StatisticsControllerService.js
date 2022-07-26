import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_BOOTH_STATISTICS,
  ENDPOINT_JOB_FAIR_STATISTICS
} from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';

export const getJobFairStatistics = (jobFairId) =>
  CallAPI(`${ENDPOINT_JOB_FAIR_STATISTICS}/${jobFairId}`, 'GET', {}, {});

export const getBoothStatistics = (boothId) => CallAPI(`${ENDPOINT_BOOTH_STATISTICS}/${boothId}`, 'GET', {}, {});
