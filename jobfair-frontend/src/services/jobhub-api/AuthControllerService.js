import { CallAPI } from '../axiosBase';
import { ENDPOINT_LOGIN } from '../../constants/Endpoints/jobhub-api/AuthControllerEndpoint';

export const signInAPI = (data) => CallAPI(ENDPOINT_LOGIN, 'post', data);
