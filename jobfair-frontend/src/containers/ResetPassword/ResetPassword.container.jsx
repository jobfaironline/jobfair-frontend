import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, notification } from 'antd'
import { resetPasswordAPI } from '../../services/reset-password-controller/ResetPasswordControllerService'
import { PATH } from '../../constants/Paths/Path'
import ResetPasswordComponent from '../../components/ResetPassword/ResetPassword.component'
const ResetPasswordContainer = () => {
  const [otpCode, setOtpCode] = useState()
  const location = useLocation()
  const [form] = Form.useForm()
  const history = useHistory()
  const onFinish = async values => {
    const body = {
      email: values?.email ? values.email : location?.state?.email,
      otp: otpCode,
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
    <div className="page">
      <ResetPasswordComponent form={form} onFinish={onFinish} email={location?.state?.email} setOtpCode={setOtpCode} />
    </div>
  )
}
export default ResetPasswordContainer
