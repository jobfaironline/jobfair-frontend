import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_CREATE_DRAFT_REGISTRATION,
  ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION,
  ENDPOINT_GET_ALL_COMPANY_REGISTRATION_FOR_ADMIN,
  ENDPOINT_GET_LATEST_APPROVE_REGISTRATION,
  ENDPOINT_GET_LATEST_COMPANY_REGISTRATION,
  ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID,
  ENDPOINT_SUBMIT_REGISTRATION
} from '../../constants/Endpoints/company-registration-controller/CompanyRegistrationControllerEndpoint';

export const getLatestApproveRegistration = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LATEST_APPROVE_REGISTRATION}/${jobFairId}`, 'GET');
export const getRegistrationByJobFairId = (jobFairId, pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_GET_REGISTRATIONS_BY_JOB_FAIR_ID}/${jobFairId}`,
    'GET',
    {},
    {
      direction,
      offset: pageNumber,
      pageSize,
      sortBy
    }
  );
export const getAllRegistractionForAdmin = (jobFairId, pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_GET_ALL_COMPANY_REGISTRATION_FOR_ADMIN}/${jobFairId}`,
    'GET',
    {},
    {
      direction,
      offset: pageNumber,
      pageSize,
      sortBy
    }
  );
export const evaluateJobFairRegistrationAPI = (body) => CallAPI(ENDPOINT_EVALUATE_JOB_FAIR_REGISTRATION, 'POST', body);
export const createDraftRegistrationAPI = (body) => CallAPI(ENDPOINT_CREATE_DRAFT_REGISTRATION, 'POST', body);
export const submitRegistrationAPI = (id) => CallAPI(`${ENDPOINT_SUBMIT_REGISTRATION}/${id}`, 'POST');
export const getLatestCompanyRegistration = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LATEST_COMPANY_REGISTRATION}/${jobFairId}`, 'GET');
