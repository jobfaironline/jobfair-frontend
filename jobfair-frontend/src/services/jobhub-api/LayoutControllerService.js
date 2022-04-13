import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID,
  ENDPOINT_GET_LAYOUT_BY_JOB_FAIR,
  ENDPOINT_LAYOUT,
  ENDPOINT_PICK_LAYOUT_FOR_JOB_FAIR
} from '../../constants/Endpoints/jobhub-api/LayoutControllerEndPoint';

export const getLayoutAndAvailableSlotByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID}/${jobFairId}`, 'GET', {});
export const getLayoutDetail = (layoutId) => CallAPI(`${ENDPOINT_LAYOUT}/${layoutId}`, 'GET');

export const pickLayoutForJobFair = (body) => CallAPI(`${ENDPOINT_PICK_LAYOUT_FOR_JOB_FAIR}`, 'POST', body);

export const getLayoutByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LAYOUT_BY_JOB_FAIR}/${jobFairId}`, 'GET', {});
