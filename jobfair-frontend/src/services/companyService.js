import { CallAPI } from './axiosBase.js'
import {ENDPOINT_COMPANY} from "../constants/EndPoint";

export const getCompanyProfileAPI = companyId =>
    CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'GET');

export const updateCompanyProfileAPI = (body, companyId) =>
    CallAPI(`${ENDPOINT_COMPANY}/${companyId}`, 'PUT', body);