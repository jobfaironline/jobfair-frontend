import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID,
  ENDPOINT_LAYOUT
} from '../../constants/Endpoints/jobhub-api/LayoutControllerEndPoint';

export const getLayoutAndAvailableSlotByJobFairId = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LAYOUT_AND_AVAILABLE_SLOT_BY_JOB_FAIR_ID}/${jobFairId}`, 'GET', {});
export const getLayoutDetail = (jobFairId) => CallAPI(`${ENDPOINT_LAYOUT}/${jobFairId}`, 'GET');
export const getCompanyLayoutAPI = () => CallAPI(`${ENDPOINT_LAYOUT}/company-manager`, 'GET', {}, {});
export const uploadTemplateAPI = async (id, formData) =>
  CallAPI(`${ENDPOINT_LAYOUT}/${id}/content`, 'POST', formData, {}, { 'content-type': 'multipart/form-data' });
export const uploadTemplateMetaDataAPI = (body) => CallAPI(ENDPOINT_LAYOUT, 'POST', body, {});
export const uploadThumbnailAPI = (body, layoutId) =>
  CallAPI(
    `${ENDPOINT_LAYOUT}/upload-thumbnail/${layoutId}`,
    'POST',
    body,
    {},
    { 'content-type': 'multipart/form-data' }
  );
