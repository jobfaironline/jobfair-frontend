import { CallAPI } from '../axiosBase';
import { ENDPOINT_LOGIN } from '../../constants/Endpoints/auth-controller/AuthControllerEndpoint';

export const signInAPI = (data) => CallAPI(ENDPOINT_LOGIN, 'post', data);
