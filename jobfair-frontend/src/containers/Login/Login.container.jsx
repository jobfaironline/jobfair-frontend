import React from 'react'
import { Form, notification } from 'antd'
import LoginComponent from '../../components/Login/Login.component'
import { signInAPI } from '../../services/auth-controller/AuthControllerService'
import { useDispatch } from 'react-redux'
import { SigninHandler } from '../../redux-flow/authentication/authentication-action'
import { useHistory } from 'react-router-dom'
import { PATH, PATH_ADMIN, PATH_ATTENDANT } from '../../constants/Paths/Path'

const LoginContainer = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = async values => {
    const body = {
      email: values.email,
      password: values.password
    }
    signInAPI(body)
      .then(res => {
        notification['success']({
          message: `Login successfully.`,
          duration: 1
        })
        dispatch(SigninHandler(res.data))
        switch (res.data.roles) {
          case 'COMPANY_EMPLOYEE':
          case 'COMPANY_MANAGER':
            history.push(PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE)
            return
          case 'ATTENDANT':
            history.push(PATH_ATTENDANT.JOB_FAIR_LIST_PAGE)
            return
          case 'ADMIN':
            history.push(PATH_ADMIN.JOB_FAIR_LIST_PAGE)
            return
        }
      })
      .catch(() => {
        notification['error']({
          message: `Login failed - Invalid email or password.`,
          duration: 1
        })
      })
  }

  return (
    <>
      <LoginComponent form={form} onFinish={onFinish} />
    </>
  )
}

export default LoginContainer
