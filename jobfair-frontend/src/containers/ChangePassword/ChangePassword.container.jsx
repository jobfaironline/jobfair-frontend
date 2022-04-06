import React from 'react'
import ChangePasswordComponent from '../../components/ChangePassword/ChangePassword.component'
import { Form, notification } from 'antd'
import { changePasswordAPI } from '../../services/account-controller/AccountControllerService'

const ChangePasswordContainer = () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    const body = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword
    }
    changePasswordAPI(body)
      .then(() => {
        notification['success']({
          message: `Change password successfully`
        })
      })
      .catch(err => {
        notification['error']({
          message: `Oops! - ${err.response.data.message}`
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
