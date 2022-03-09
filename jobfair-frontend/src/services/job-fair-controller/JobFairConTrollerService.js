import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY,
  ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK,
  ENDPOINT_JOB_FAIR,
  ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT
} from '../../constants/Endpoints/job-fair-controller/JobFairConTrollerEndpoint'
export const getJobFairPlanForCompany = (pageNumber, pageSize) =>
  CallAPI(`${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?offset=${pageNumber}&pageSize=${pageSize}`)

export const getLayoutInformationForJobFairPark = jobFairId =>
  CallAPI(ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK + `/${jobFairId}`, 'GET')

export const getAllJobFairAPI = (pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}?direction=${direction}&offset=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`,
    'GET'
  )
export const evaluateJobFairPlanAPI = body => CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body)
export const getJobFairForAttendant = (filterStatus, offset, pageSize) =>
  CallAPI(`${ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT}?filterStatus=${filterStatus}&offset=${offset}&pageSize=${pageSize}`)
