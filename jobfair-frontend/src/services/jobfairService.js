import { CallAPI } from './axiosBase.js'
import {
  ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION,
  ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID,
  ENDPOINT_JOB_FAIR
} from '../constants/EndPoint'

export const getAllJobFairAPI = () => CallAPI(ENDPOINT_JOB_FAIR, 'GET')
export const getRegistrationByJobFairId = jobFairId =>
  CallAPI(`${ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID}/${jobFairId}`, 'GET')
export const evaluateJobFairRegistrationAPI = body =>
  CallAPI(ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION, 'POST', body)
export const evaluateJobFairPlanAPI = body =>
  CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body)
