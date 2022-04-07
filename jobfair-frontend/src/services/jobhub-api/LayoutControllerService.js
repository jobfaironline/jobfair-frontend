import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID,
  ENDPOINT_LAYOUT
} from '../../constants/Endpoints/layout-controller/LayoutControllerEndPoint';

export const getLayoutAndAvailableSlotByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID}/${jobFairId}`, 'GET', {});
export const getLayoutDetail = (jobFairId) => CallAPI(`${ENDPOINT_LAYOUT}/${jobFairId}`, 'GET');
