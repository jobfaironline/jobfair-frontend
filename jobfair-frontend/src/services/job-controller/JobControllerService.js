import { CallAPI } from '../axiosBase'
import { ENDPOINT_JOB_CONTROLLER } from '../../constants/Endpoints/job-controller/JobControllerEndpoint'
export const createJobPositionsAPI = data => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'POST', data)
export const getJobPositionsAPI = () => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'GET')
