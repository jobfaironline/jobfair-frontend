import {
  ENDPOINT_LOGIN,
  ENDPOINT_REGISTER_ATTENDANT,
  ENDPOINT_REGISTER_COMPANY,
  ENDPOINT_CHANGE_PASSWORD,
} from "../Constants/EndPoint";
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
//change password
export const changePasswordAPI = (data) =>
CallAPI(ENDPOINT_CHANGE_PASSWORD, "POST", data);
