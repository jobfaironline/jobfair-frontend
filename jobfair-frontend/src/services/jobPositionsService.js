import { ENDPOINT_JOB_CONTROLLER } from '../constants/EndPoint'
// handle api with axios
import { CallAPI } from './axiosBase.js'
//Get employees
export const createJobPositionsAPI = data => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'POST', data)
