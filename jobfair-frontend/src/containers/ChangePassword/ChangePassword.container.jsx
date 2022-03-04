import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, notification } from 'antd'
import { resetPasswordAPI } from '../../services/reset-password-controller/ResetPasswordControllerService'
import { PATH } from '../../constants/Paths/Path'
import ChangePasswordComponent from '../../components/ChangePassword/ChangePassword.component'
const ChangePasswordContainer = () => {
  const location = useLocation()
  const [form] = Form.useForm()
  const history = useHistory()
  const onFinish = async values => {
    const body = {
      email: location?.state?.email,
      otp: values.otp,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    }
    resetPasswordAPI(body)
      .then(res => {
        notification['success']({
          message: `Your password has been change!.`,
          duration: 1
        })
        history.push(PATH.LOGIN_PAGE)
      })
      .catch(err => {
        notification['error']({
          message: `Error - ${err.response.data.message}`,
          duration: 1
        })
      })
  }
  return (
    <>
      <ChangePasswordComponent form={form} onFinish={onFinish} />
    </>
  )
}
export default ChangePasswordContainer
