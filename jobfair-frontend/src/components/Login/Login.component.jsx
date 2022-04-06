import React from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { PATH } from '../../constants/Paths/Path'
import './Login.styles.scss'
import { LoginValidation } from '../../validate/LoginValidation'

const LoginComponent = ({ onFinish, form }) => {
  const history = useHistory()
  return (
    <>
      <Divider orientation="center" plain>
        <Typography.Title level={4}>Job Fair Online - Login</Typography.Title>
      </Divider>
      <div className="input-container">
        <Form className="login-form" form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item name="email" hasFeedback rules={LoginValidation.email}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" hasFeedback rules={LoginValidation.password}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="login">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item className="forgot-password">
            <Button type="link" onClick={() => history.push(PATH.FORGOT_PASSWORD_PAGE)}>
              Forgot password?
            </Button>
          </Form.Item>
          <Form.Item className="register">
            <span>Don't you have an account?</span> <Button type="link">Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginComponent
