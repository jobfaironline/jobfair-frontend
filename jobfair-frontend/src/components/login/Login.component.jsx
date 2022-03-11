import React from 'react'
import {Button, Divider, Form, Input, Space, Typography} from 'antd'
import {useHistory} from 'react-router-dom'
import {PATH} from '../../constants/Paths/Path'
import './Login.styles.scss'

const LoginComponent = ({onFinish, form}) => {
  const history = useHistory()
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
              {required: true, message: 'Please input your email!'},
              {
                type: 'email',
                message: 'This field has invalid email format.'
              }
            ]}
          >
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item name="password" hasFeedback rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password placeholder="Password"/>
          </Form.Item>
          <Space>
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
          </Space>
          <Form.Item className="register">
            <span>Don't you have an account?</span> <Button type="link" href={PATH.REGISTER_PAGE}>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginComponent
