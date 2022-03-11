import React from 'react'
import {Form, notification} from 'antd'
import ForgotPasswordComponent from '../../components/ForgotPassword/ForgotPassword.component'
import {useHistory} from 'react-router-dom'
import {forgotPasswordAPI} from '../../services/account-controller/AccountControllerService'
import {PATH} from '../../constants/Paths/Path'

const ForgotPasswordContainer = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const onFinish = async values => {
    const body = {
      email: values.email
    }
    forgotPasswordAPI(body)
      .then(res => {
        notification['success']({
          message: `Your OTP Code has been sent in your email box.`,
          duration: 1
        })
        history.push({pathname: PATH.CHANGE_PASSWORD_PAGE, state: {email: body.email}})
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
      <ForgotPasswordComponent form={form} onFinish={onFinish}/>
    </>
  )
}
export default ForgotPasswordContainer
