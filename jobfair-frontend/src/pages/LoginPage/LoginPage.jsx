import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SigninHandler } from '../../redux-flow/authentication/authentication-action'
import { signInAPI } from '../../services/userService'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { notify } from '../../utils/toastutil'
import { Form, notification } from 'antd'
import LoginContainer from '../../containers/login/Login.container'
import './LoginPage.styles.scss'

if (typeof window !== 'undefined') {
  injectStyle()
}
const LoginPage = () => {
  return (
    <div className="page">
      <div className="leftside-container">
        <div className="login-container">
          <LoginContainer />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
