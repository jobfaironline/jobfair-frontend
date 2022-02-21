import { ENDPOINT_CRUD_EMPLOYEES } from '../constants/EndPoint'
// handle api with axios
import { CallAPI } from './axiosBase.js'
//Register employee
export const createEmployeesAPI = data => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}`, 'POST', data)
//Get employees
export const getEmployeesAPI = companyId => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${companyId}`, 'GET')
//Delete employee
export const deleteEmployeeAPI = employeeId => CallAPI(`${ENDPOINT_CRUD_EMPLOYEES}/${employeeId}`, 'DELETE')
