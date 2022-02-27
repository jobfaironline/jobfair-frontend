import { CallAPI } from './axiosBase.js'
import {ENDPOINT_JOB_FAIR} from "../constants/EndPoint";

export const getAllJobFairAPI = () => CallAPI(ENDPOINT_JOB_FAIR, 'GET')
