import {
  ENDPOINT_ATTENDANT,
  ENDPOINT_LOGIN,
  ENDPOINT_REGISTER_ATTENDANT,
  ENDPOINT_REGISTER_COMPANY,
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
//view attendant detail
export const getAttendantDetailAPI = (attendantId) =>
    CallAPI(ENDPOINT_ATTENDANT + '/' + `${attendantId}`, "GET");