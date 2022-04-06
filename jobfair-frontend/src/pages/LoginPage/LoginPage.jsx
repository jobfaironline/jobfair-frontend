import React from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'
import LoginContainer from '../../containers/Login/Login.container'
import './LoginPage.styles.scss'

if (typeof window !== 'undefined') {
  injectStyle()
}
const LoginPage = () => {
  return (
    <div className="page login-page">
      <div style={{ display: 'flex' }}>
        <div className="leftside-container">
          <div className="login-container animate__fadeInDown">
            <LoginContainer />
          </div>
        </div>
        <div className="rightside-container">
          <img src="https://images.unsplash.com/photo-1559437380-d5af8338577f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></img>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
