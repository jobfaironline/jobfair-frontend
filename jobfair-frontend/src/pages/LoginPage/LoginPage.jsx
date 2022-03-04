import React, { useState } from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
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
