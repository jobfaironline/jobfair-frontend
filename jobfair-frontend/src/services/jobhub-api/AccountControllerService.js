import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_DEACTIVATE_ACCOUNT,
  ENDPOINT_FORGOT_PASSWORD,
  ENDPOINT_GET_ACCOUNT_BY_ID,
  ENDPOINT_GET_GENERAL_INFO,
  ENDPOINT_UPLOAD_PROFILE
} from '../../constants/Endpoints/jobhub-api/AccountControllerEndpoint';

export const changePasswordAPI = (data) => CallAPI(ENDPOINT_CHANGE_PASSWORD, 'POST', data);
export const getAccountByIdAPI = (id) => CallAPI(`${ENDPOINT_GET_ACCOUNT_BY_ID}/${id}`, 'GET');
export const forgotPasswordAPI = (data) => CallAPI(ENDPOINT_FORGOT_PASSWORD, 'POST', data);
export const getGeneralInfoAPI = (email) =>
  CallAPI(
    ENDPOINT_GET_GENERAL_INFO,
    'GET',
    {},
    {
      email
    }
  );

export const deactivateOwnAccountAPI = () => CallAPI(ENDPOINT_DEACTIVATE_ACCOUNT, 'GET');
export const uploadProfileImage = (body) =>
  CallAPI(ENDPOINT_UPLOAD_PROFILE, 'POST', body, {}, { 'content-type': 'multipart/form-data' });
