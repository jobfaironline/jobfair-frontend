import { CallAPI } from '../axiosBase'
import { ENDPOINT_GET_COMPANY_BOOTH_BY_JOB_FAIR_ID } from '../../constants/Endpoints/company-booth-controller/CompanyBoothControllerEndpoint'
export const getCompanyBoothByJobFairId = jobFairId =>
  CallAPI(`${ENDPOINT_GET_COMPANY_BOOTH_BY_JOB_FAIR_ID}?jobFairId=${jobFairId}`, 'GET')
