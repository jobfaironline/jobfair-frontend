import { CallAPI } from './axiosBase.js'
import { ENDPOINT_GET_LAYOUT_BY_JOB_FAIR_ID } from '../constants/EndPoint'
import {
  ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION,
  ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID,
  ENDPOINT_JOB_FAIR
} from '../constants/EndPoint'

export const getLayoutByJobFairId = jobFairId => CallAPI(ENDPOINT_GET_LAYOUT_BY_JOB_FAIR_ID + `/${jobFairId}`, 'GET')

export const getAllJobFairAPI = (pageNumber, pageSize, sortBy, direction) =>
    CallAPI(`${ENDPOINT_JOB_FAIR}/?direction=${direction}&offset=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, 'GET')
//page Number start from 0
export const getRegistrationByJobFairId = (jobFairId, pageNumber, pageSize, sortBy, direction) =>
  CallAPI(`${ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID}/${jobFairId}?direction=${direction}&offset=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, 'GET')
export const evaluateJobFairRegistrationAPI = body =>
  CallAPI(ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION, 'POST', body)
export const evaluateJobFairPlanAPI = body =>
  CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body)
