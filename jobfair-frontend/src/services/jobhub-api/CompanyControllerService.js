import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_COMPANY,
  ENDPOINT_UPLOAD_COMPANY_LOGO
} from '../../constants/Endpoints/jobhub-api/CompanyControllerEndpoint';

export const getCompanyProfileAPI = (companyId) => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'GET');
export const updateCompanyProfileAPI = (body, companyId) => CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'PUT', body);
export const createCompanyAPI = (body) => CallAPI(ENDPOINT_COMPANY, 'POST', body);
export const uploadCompanyLogo = (body) =>
  CallAPI(ENDPOINT_UPLOAD_COMPANY_LOGO, 'POST', body, {}, { 'content-type': 'multipart/form-data' });
