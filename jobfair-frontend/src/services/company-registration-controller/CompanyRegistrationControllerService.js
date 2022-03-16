import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_GET_LATEST_APPROVE_REGISTRATION,
  ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID,
  ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION,
  ENDPOINT_CREATE_DRAFT_REGISTRATION,
  ENDPOINT_SUBMIT_REGISTRATION, ENDPOINT_GET_LATEST_COMPANY_REGISTRATION
} from '../../constants/Endpoints/company-registration-controller/CompanyRegistrationControllerEndpoint'
export const getLatestApproveRegistration = jobFairId =>
  CallAPI(`${ENDPOINT_GET_LATEST_APPROVE_REGISTRATION}/${jobFairId}`, 'GET')
export const getRegistrationByJobFairId = (jobFairId, pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID}/${jobFairId}`,
    'GET',
      {},
      {
        direction: direction,
        offset: pageNumber,
        pageSize: pageSize,
        sortBy: sortBy
      }
  )
export const evaluateJobFairRegistrationAPI = body => CallAPI(ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION, 'POST', body)
export const createDraftRegistrationAPI = body => CallAPI(ENDPOINT_CREATE_DRAFT_REGISTRATION, 'POST', body)
export const submitRegistrationAPI = id => CallAPI(`${ENDPOINT_SUBMIT_REGISTRATION}/${id}`, 'POST')
export const getLatestCompanyRegistration = jobFairId => CallAPI(`${ENDPOINT_GET_LATEST_COMPANY_REGISTRATION}/${jobFairId}`, 'GET')

