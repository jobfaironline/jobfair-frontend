import { CallAPI } from '../axiosBase'
import { ENDPOINT_GET_COMPANY_BOOTH } from '../../constants/Endpoints/company-booth-controller/CompanyBoothControllerEndpoint'

export const getCompanyBoothByJobFairId = jobFairId =>
  CallAPI(`${ENDPOINT_GET_COMPANY_BOOTH}?jobFairId=${jobFairId}`, 'GET')
export const getCompanyBoothById = boothId => CallAPI(`${ENDPOINT_GET_COMPANY_BOOTH}/${boothId}`, 'GET')
