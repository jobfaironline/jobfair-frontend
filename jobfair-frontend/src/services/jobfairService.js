import { CallAPI } from './axiosBase.js'
import {
  ENDPOINT_GET_COMPANY_BOOTH_BY_JOB_FAIR_ID,
  ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY,
  ENDPOINT_GET_LATEST_APPROVE_REGISTRATION,
  ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK
} from '../constants/EndPoint'
import {
  ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION,
  ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID,
  ENDPOINT_JOB_FAIR
} from '../constants/EndPoint'

export const getLayoutInformationForJobFairPark = jobFairId => CallAPI(ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK + `/${jobFairId}`, 'GET')
export const getAllJobFairAPI = (pageNumber, pageSize, sortBy, direction) => CallAPI(`${ENDPOINT_JOB_FAIR}?direction=${direction}&offset=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, 'GET')
//page Number start from 0
export const getRegistrationByJobFairId = (jobFairId, pageNumber, pageSize, sortBy, direction) =>
  CallAPI(`${ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID}/${jobFairId}?direction=${direction}&offset=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, 'GET')
export const evaluateJobFairRegistrationAPI = body =>
  CallAPI(ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION, 'POST', body)
export const evaluateJobFairPlanAPI = body =>
  CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body)
export const getLatestApproveRegistration = jobFairId => CallAPI(`${ENDPOINT_GET_LATEST_APPROVE_REGISTRATION}/${jobFairId}`, 'GET')
export const getJobFairPlanForCompany = (pageNumber, pageSize) =>
  CallAPI(`${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?offset=${pageNumber}&pageSize=${pageSize}`)
export const getCompanyBoothByJobFairId = jobFairId => CallAPI(`${ENDPOINT_GET_COMPANY_BOOTH_BY_JOB_FAIR_ID}?jobFairId=${jobFairId}`, 'GET')
