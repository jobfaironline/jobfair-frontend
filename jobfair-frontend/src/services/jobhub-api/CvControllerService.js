import { CallAPI } from '../axiosBase';
import { ENDPOINT_CV_CONTROLLER } from '../../constants/Endpoints/jobhub-api/CvControllerEndpoint';

export const getAttendantCv = () => CallAPI(`${ENDPOINT_CV_CONTROLLER}`, 'GET');
export const getAttendantCvById = async (cvId) => CallAPI(`${ENDPOINT_CV_CONTROLLER}/${cvId}`, 'GET');
