import { CallAPI } from '../axiosBase'
import { ENDPOINT_COMPANY } from '../../constants/Endpoints/company-controller/CompanyControllerEndpoint'

export const getCompanyProfileAPI = companyId => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'GET')
export const updateCompanyProfileAPI = (body, companyId) => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'PUT', body)
