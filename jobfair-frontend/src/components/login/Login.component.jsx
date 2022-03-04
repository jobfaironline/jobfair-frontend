import React from 'react'
import { Button, Checkbox, Divider, Form, Input, Layout, Typography } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import './Login.styles.scss'

const LoginComponent = ({ onFinish, form }) => {
  return (
    <>
      <Divider orientation="center" plain>
        <Typography.Title level={4}>Job Fair Online - Login</Typography.Title>
      </Divider>
      <div className="input-container">
        <Form className="login-form" form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'This field has invalid email format.'
              }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="login">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item className="forgot-password">
            <Button type="link">Forgot password?</Button>
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
