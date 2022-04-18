import {
  ASSIGNMENT,
  ASSIGNMENT_BY_BOOTH_ID,
  ASSIGNMENT_BY_EMPLOYEE_ID,
  AVAILABLE_COMPANY_EMPLOYEE,
  STATISTICS,
  UNASSIGNMENT
} from '../../constants/Endpoints/jobhub-api/AssignmentControllerEndpoint';
import { CallAPI } from '../axiosBase';

export const getAvailableCompanyEmployee = (jobFairId) => CallAPI(`${AVAILABLE_COMPANY_EMPLOYEE}/${jobFairId}`, 'GET');
export const getAssigmentByJobFairBoothId = (jobFairBoothId) =>
  CallAPI(`${ASSIGNMENT_BY_BOOTH_ID}/${jobFairBoothId}`, 'GET');
export const assignEmployee = (employeeId, jobFairBoothId, type) =>
  CallAPI(`${ASSIGNMENT}`, 'POST', { employeeId, jobFairBoothId, type });
export const unAssignEmployee = (employeeId, jobFairBoothId) =>
  CallAPI(`${UNASSIGNMENT}`, 'DELETE', { employeeId, jobFairBoothId });
export const getStatisticsByJobFair = (jobFairId) => CallAPI(`${STATISTICS}/${jobFairId}`, 'GET');
export const getAssignmentByEmployeeId = (direction = 'ASC', offset = '0', pageSize = '10', sortBy = 'createTime') =>
  CallAPI(`${ASSIGNMENT_BY_EMPLOYEE_ID}`, 'GET', {}, { direction, offset, pageSize, sortBy });
