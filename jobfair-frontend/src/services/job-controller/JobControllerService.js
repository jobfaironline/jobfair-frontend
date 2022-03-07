import { CallAPI } from '../axiosBase'
import { ENDPOINT_JOB_CONTROLLER } from '../../constants/Endpoints/job-controller/JobControllerEndpoint'
export const createJobPositionsAPI = data => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'POST', data)
export const getJobPositionsAPI = (direction, offset, pageSize, sortBy) =>
    CallAPI(`${ENDPOINT_JOB_CONTROLLER}?direction=${direction}&&offset=${offset}&pageSize=${pageSize}&sortBy=${sortBy}`, 'GET')
export const updateJobPositionAPI = (body, id) =>
    CallAPI(`${ENDPOINT_JOB_CONTROLLER}/${id}`, 'PUT', body)
export const deleteJobPositionAPI = (id) =>
    CallAPI(`${ENDPOINT_JOB_CONTROLLER}/${id}`, 'DELETE')
