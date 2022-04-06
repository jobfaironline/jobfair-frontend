import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_FORGOT_PASSWORD,
  ENDPOINT_GET_ACCOUNT_BY_ID
} from '../../constants/Endpoints/account-controller/AccountControllerEndpoint'

export const changePasswordAPI = data => CallAPI(ENDPOINT_CHANGE_PASSWORD, 'POST', data)
export const getAccountByIdAPI = id => CallAPI(`${ENDPOINT_GET_ACCOUNT_BY_ID}/${id}`, 'GET')
export const forgotPasswordAPI = data => CallAPI(ENDPOINT_FORGOT_PASSWORD, 'POST', data)
