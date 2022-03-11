import React from 'react'
import {Button, Divider, Form, Input, Tabs, Typography} from 'antd'
import './Register.styles.scss'
import {PATH} from "../../constants/Paths/Path";

const {TabPane} = Tabs

const RegisterComponent = ({onFinish, form}) => {
  return (
    <div className="register-container">
      <Divider orientation="center" plain>
        <Typography.Title level={4}>Job Fair Online - Sign up</Typography.Title>
      </Divider>
      <Tabs defaultActiveKey="ATTENDANT" centered>
        <TabPane tab="ATTENDANT" key="ATTENDANT">
          <AttendantForm/>
        </TabPane>
        <TabPane tab="COMPANY" key="COMPANY">
          <CompanyForm/>
        </TabPane>
      </Tabs>
    </div>
  )
}

const AttendantForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} name="register" onFinish={() => {
    }} scrollToFirstError>
      <Form.Item name="attendantName"
                 rules={[{required: true, message: 'Please input your name', whitespace: true}]}>
        <Input placeholder="Your name"/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            }
          })
        ]}
      >
        <Input.Password placeholder="Confirm password"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item className="login-text">
        <span>Already have an account?</span> <Button type="link" href={PATH.LOGIN_PAGE}>Login now!</Button>
      </Form.Item>
    </Form>
  )
}

const CompanyForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} name="register" onFinish={() => {
    }} scrollToFirstError>
      <Form.Item name="companyName"
                 rules={[{required: true, message: 'Please input your name', whitespace: true}]}>
        <Input placeholder="Your company name"/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            }
          })
        ]}
      >
        <Input.Password placeholder="Confirm password"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item className="login-text">
        <span>Already have an account?</span> <Button type="link" href={PATH.LOGIN_PAGE}>Login now!</Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterComponent
