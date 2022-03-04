import React from 'react'
import { Form, notification } from 'antd'
import LoginComponent from '../../components/login/Login.component'
import { signInAPI } from '../../services/auth-controller/AuthControllerService'
import { useDispatch } from 'react-redux'
import { SigninHandler } from '../../redux-flow/authentication/authentication-action'
import { useHistory } from 'react-router-dom'

const LoginContainer = props => {
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
            history.push('/jobfair-list')
            return
          case 'ATTENDANT':
            history.push(`/map/fc271a03-cb11-469b-ae94-6873117b43d1`)
            return
          case 'ADMIN':
            history.push('/job-fair')
            return
        }
      })
      .catch(err => {
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
