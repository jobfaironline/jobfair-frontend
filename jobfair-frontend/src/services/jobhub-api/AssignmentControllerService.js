import {
  ASSIGN,
  ASSIGNMENT,
  ASSIGNMENT_BY_BOOTH_ID,
  AVAILABLE_COMPANY_EMPLOYEE,
  STATISTICS,
  UNASSIGNMENT
} from '../../constants/Endpoints/jobhub-api/AssignmentControllerEndpoint';
import { CallAPI } from '../axiosBase';

export const getAvailableCompanyEmployee = (jobFairId) => CallAPI(`${AVAILABLE_COMPANY_EMPLOYEE}/${jobFairId}`, 'GET');
export const getAssigmentByJobFairBoothId = (jobFairBoothId) =>
  CallAPI(`${ASSIGNMENT_BY_BOOTH_ID}/${jobFairBoothId}`, 'GET');
export const assignEmployee = (employeeId, jobFairBoothId, type) =>
  CallAPI(`${ASSIGN}`, 'POST', { employeeId, jobFairBoothId, type });
export const unAssignEmployee = (employeeId, jobFairBoothId) =>
  CallAPI(`${UNASSIGNMENT}`, 'DELETE', { employeeId, jobFairBoothId });
export const getStatisticsByJobFair = (jobFairId) => CallAPI(`${STATISTICS}/${jobFairId}`, 'GET');
export const getAssignmentById = (assignmentId) => CallAPI(`${ASSIGNMENT}/${assignmentId}`, 'GET');
