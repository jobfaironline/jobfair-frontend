import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_ATTENDANT,
  ENDPOINT_REGISTER_ATTENDANT
} from '../../constants/Endpoints/attendant-controller/AttendantControllerEndpoint'
export const getAttendantDetailAPI = attendantId => CallAPI(`${ENDPOINT_ATTENDANT}/${attendantId}`, 'GET')
export const updateAttendantProfileAPI = body => CallAPI(`${ENDPOINT_ATTENDANT}/update`, 'PUT', body)
export const registerAttendantAPI = data => CallAPI(ENDPOINT_REGISTER_ATTENDANT, 'post', data)
