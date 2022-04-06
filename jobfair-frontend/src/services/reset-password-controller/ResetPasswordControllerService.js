import { CallAPI } from '../axiosBase'
import { ENDPOINT_RESET_PASSWORD } from '../../constants/Endpoints/reset-password-controller/ResetPasswordControllerEndPoint'

export const resetPasswordAPI = data =>
  CallAPI(ENDPOINT_RESET_PASSWORD, 'POST', data)
