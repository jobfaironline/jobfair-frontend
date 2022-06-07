import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_FORGOT_PASSWORD,
  ENDPOINT_GET_ACCOUNT_BY_ID,
  ENDPOINT_GET_GENERAL_INFO
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
