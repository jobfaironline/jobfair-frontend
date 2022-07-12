import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_CRUD_EMPLOYEES,
  ENDPOINT_CRUD_EMPLOYEES_UPDATE,
  ENDPOINT_EMPLOYEE_BY_COMPANY_ID,
  ENDPOINT_REGISTER_COMPANY
} from '../../constants/Endpoints/jobhub-api/CompanyEmployeeControllerEndpoint';

export const createEmployeesAPI = (data) => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}`, 'POST', data);
//Get employees
export const getEmployeesAPI = ({ companyId, offset = 0, pageSize = 10, searchContent = '' }) =>
  CallAPI(`${ENDPOINT_EMPLOYEE_BY_COMPANY_ID}/${companyId}`, 'GET', {}, { offset, pageSize, searchContent });
export const getEmployeeByIdAPI = (employeeId) => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${employeeId}`, 'GET', null);
//Delete employee
export const deleteEmployeeAPI = (employeeId) => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${employeeId}`, 'DELETE');
export const registerCompanyAPI = (data) => CallAPI(ENDPOINT_REGISTER_COMPANY, 'Post', data);
export const uploadCSVFile = async (formData) =>
  CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/csv`, 'POST', formData, {}, { 'content-type': 'multipart/form-data' });
export const updateEmployeeAPI = (body) => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES_UPDATE}`, 'PUT', body);
