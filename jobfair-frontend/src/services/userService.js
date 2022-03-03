import {
  ENDPOINT_LOGIN,
  ENDPOINT_REGISTER_ATTENDANT,
  ENDPOINT_REGISTER_COMPANY,
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_COMPANY,
  ENDPOINT_GET_ACCOUNT_BY_ID,
  ENDPOINT_FORGOT_PASSWORD
} from '../constants/EndPoint'
// handle api with axios
import { CallAPI } from './axiosBase.js'
//Login
export const signInAPI = data => CallAPI(ENDPOINT_LOGIN, 'post', data)
//register attendant role
export const registerAttendantAPI = data => CallAPI(ENDPOINT_REGISTER_ATTENDANT, 'post', data)
//register company role
export const registerCompanyAPI = data => CallAPI(ENDPOINT_REGISTER_COMPANY, 'Post', data)
//change password
export const changePasswordAPI = data => CallAPI(ENDPOINT_CHANGE_PASSWORD, 'POST', data)
//update company profile
export const updateCompanyProfileAPI = data => CallAPI(ENDPOINT_COMPANY, 'POST', data)
//get company profile by id
export const getCompanyProfileAPI = id => CallAPI(ENDPOINT_COMPANY + `/${id}`, 'GET')
//get account by accountId
export const getAccountByIdAPI = id => CallAPI(`${ENDPOINT_GET_ACCOUNT_BY_ID}/${id}`, 'GET')
export const forgotPasswordAPI = data => CallAPI(ENDPOINT_FORGOT_PASSWORD, 'POST', data)
