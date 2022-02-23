import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SigninHandler } from '../../redux-flow/authentication/authentication-action'
import { signInAPI } from '../../services/userService'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { notify } from '../../utils/toastutil'
import { Form, notification } from 'antd'
import LoginContainer from '../../containers/login/Login.container'

if (typeof window !== 'undefined') {
  injectStyle()
}
const LoginPage = () => {
  return (
    <>
      <LoginContainer />
    </>
  )
}

export default LoginPage
