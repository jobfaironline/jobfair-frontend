import React, { useState } from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
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
