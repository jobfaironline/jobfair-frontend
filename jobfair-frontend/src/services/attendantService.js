import { CallAPI } from './axiosBase.js'
import { ENDPOINT_ATTENDANT } from '../constants/EndPoint'

export const getAttendantDetailAPI = attendantId =>
  CallAPI(`${ENDPOINT_ATTENDANT}/${attendantId}`, 'GET')

export const updateAttendantProfileAPI = body =>
  CallAPI(`${ENDPOINT_ATTENDANT}/update`, 'PUT', body)
