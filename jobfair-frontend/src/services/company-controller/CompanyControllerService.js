import { CallAPI } from '../axiosBase'
import { ENDPOINT_COMPANY } from '../../constants/Endpoints/company-controller/CompanyControllerEndpoint'
export const getCompanyProfileAPI = companyId => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'GET')
export const updateCompanyProfilePUTAPI = (body, companyId) => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'PUT', body)
export const updateCompanyProfilePOSTAPI = data => CallAPI(ENDPOINT_COMPANY, 'POST', data)
export const getCompanyProfileAPIV2 = id => CallAPI(ENDPOINT_COMPANY + `/${id}`, 'GET')
