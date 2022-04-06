import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_CRUD_EMPLOYEES,
  ENDPOINT_REGISTER_COMPANY
} from '../../constants/Endpoints/company-employee-controller/CompanyEmployeeControllerEndpoint'

export const createEmployeesAPI = data => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}`, 'POST', data)
//Get employees
export const getEmployeesAPI = companyId => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${companyId}`, 'GET')
export const getEmployeeByIdAPI = employeeId =>
  CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}`, 'GET', null, { employeeID: employeeId })
//Delete employee
export const deleteEmployeeAPI = employeeId => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${employeeId}`, 'DELETE')
export const registerCompanyAPI = data => CallAPI(ENDPOINT_REGISTER_COMPANY, 'Post', data)
