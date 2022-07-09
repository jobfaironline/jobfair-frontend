import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_CV_CONTROLLER,
  ENDPOINT_CV_UPLOAD_PROFILE_CONTROLLER
} from '../../constants/Endpoints/jobhub-api/CvControllerEndpoint';

export const getAttendantCv = () => CallAPI(`${ENDPOINT_CV_CONTROLLER}`, 'GET');
export const getAttendantCvById = (cvId) => CallAPI(`${ENDPOINT_CV_CONTROLLER}/${cvId}`, 'GET');
export const updateCv = (cvId, body) => CallAPI(`${ENDPOINT_CV_CONTROLLER}/${cvId}`, 'PUT', body);
export const uploadProfileImage = (body) =>
  CallAPI(ENDPOINT_CV_UPLOAD_PROFILE_CONTROLLER, 'POST', body, {}, { 'content-type': 'multipart/form-data' });
export const deleteCv = (cvId) => CallAPI(`${ENDPOINT_CV_CONTROLLER}/${cvId}`, 'DELETE');
export const draftCv = () => CallAPI(`${ENDPOINT_CV_CONTROLLER}`, 'POST');
