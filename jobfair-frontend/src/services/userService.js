import {
  ENDPOINT_LOGIN,
  ENDPOINT_REGISTER_ATTENDANT,
  ENDPOINT_REGISTER_COMPANY,
  ENDPOINT_GENERATE_OTP,
  ENDPOINT_RESET_PASSWORD,
} from "../constants/EndPoint";
// handle api with axios
import { CallAPI } from "./axiosBase.js";
//Login
export const signInAPI = (data) => CallAPI(ENDPOINT_LOGIN, "post", data);
//register attendant role
export const registerAttendantAPI = (data) =>
  CallAPI(ENDPOINT_REGISTER_ATTENDANT, "post", data);
//register company role
export const registerCompanyAPI = (data) =>
  CallAPI(ENDPOINT_REGISTER_COMPANY, "Post", data);
//send generate otp
export const generateOTPAPI = (data) =>
  CallAPI(ENDPOINT_GENERATE_OTP, "POST", data);
//reset password
export const resetPasswordAPI = (data) =>
  CallAPI(ENDPOINT_RESET_PASSWORD, "POST", data);