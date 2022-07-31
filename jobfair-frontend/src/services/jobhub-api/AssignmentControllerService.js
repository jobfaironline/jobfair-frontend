import {
  ASSIGN,
  ASSIGNMENT,
  ASSIGNMENT_BY_BOOTH_ID,
  ASSIGNMENT_BY_EMPLOYEE_ID,
  AVAILABLE_COMPANY_EMPLOYEE,
  JOB_FAIR_ASSIGNMENT_BY_EMPLOYEE_ID,
  STATISTICS,
  UNASSIGNMENT
} from '../../constants/Endpoints/jobhub-api/AssignmentControllerEndpoint';
import { CallAPI } from '../axiosBase';

export const getAvailableCompanyEmployee = (jobFairId) => CallAPI(`${AVAILABLE_COMPANY_EMPLOYEE}/${jobFairId}`, 'GET');
export const getAssigmentByJobFairBoothId = (jobFairBoothId) =>
  CallAPI(`${ASSIGNMENT_BY_BOOTH_ID}/${jobFairBoothId}`, 'GET');
export const assignEmployee = (employeeId, jobFairBoothId, type, beginTime = null, endTime = null) =>
  CallAPI(`${ASSIGN}`, 'POST', { employeeId, jobFairBoothId, type, beginTime, endTime });
export const unAssignEmployee = (assignmentId) => CallAPI(`${UNASSIGNMENT}/${assignmentId}`, 'DELETE', {});
export const updateAssignment = (assignmentId, beginTime, endTime, type) =>
  CallAPI(`${ASSIGNMENT}/${assignmentId}`, 'PUT', {}, { beginTime, endTime, type });
export const getStatisticsByJobFair = (jobFairId) => CallAPI(`${STATISTICS}/${jobFairId}`, 'GET');
export const getAssignmentByEmployeeId = (
  jobFairName = '',
  direction = 'ASC',
  offset = '0',
  pageSize = '10',
  sortBy = 'createTime',
  type
) => CallAPI(`${ASSIGNMENT_BY_EMPLOYEE_ID}`, 'GET', {}, { direction, offset, pageSize, sortBy, type, jobFairName });
export const getAssignmentById = (assignmentId) => CallAPI(`${ASSIGNMENT}/${assignmentId}`, 'GET');
export const uploadManagerCSVFile = async (formData, jobFairId) =>
  CallAPI(`${ASSIGNMENT}/csv`, 'POST', formData, { jobFairId }, { 'content-type': 'multipart/form-data' });
export const uploadSupervisorCSVFile = async (formData, jobFairBoothId) =>
  CallAPI(`${ASSIGNMENT}/shift/csv`, 'POST', formData, { jobFairBoothId }, { 'content-type': 'multipart/form-data' });

export const getJobFairAssignmentByEmployeeId = (
  jobFairName = '',
  direction = 'ASC',
  offset = '0',
  pageSize = '10',
  sortBy = 'create_time'
) => CallAPI(`${JOB_FAIR_ASSIGNMENT_BY_EMPLOYEE_ID}`, 'GET', {}, { jobFairName, direction, offset, pageSize, sortBy });
