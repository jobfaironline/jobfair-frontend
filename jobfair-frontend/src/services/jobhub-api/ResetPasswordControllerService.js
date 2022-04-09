import { CallAPI } from '../axiosBase';
import { ENDPOINT_RESET_PASSWORD } from '../../constants/Endpoints/jobhub-api/ResetPasswordControllerEndPoint';

export const resetPasswordAPI = (data) => CallAPI(ENDPOINT_RESET_PASSWORD, 'POST', data);
