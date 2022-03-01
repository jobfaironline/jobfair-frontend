import {
    ENDPOINT_CREATE_DRAFT_REGISTRATION,
    ENDPOINT_JOB_CONTROLLER,
    ENDPOINT_SUBMIT_REGISTRATION
} from '../constants/EndPoint'
// handle api with axios
import { CallAPI } from './axiosBase.js'
//Get employees
export const getJobPositionsAPI = () => CallAPI(`${ENDPOINT_JOB_CONTROLLER}`, 'GET')
export const createDraftRegistrationAPI = (body) => CallAPI(ENDPOINT_CREATE_DRAFT_REGISTRATION, 'POST', body)
export const submitRegistrationAPI = (id) => CallAPI(`${ENDPOINT_SUBMIT_REGISTRATION}/${id}`, 'POST')
