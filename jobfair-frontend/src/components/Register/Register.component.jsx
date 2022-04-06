/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Divider, Form, Input, Select, Tabs, Typography } from 'antd'
import './Register.styles.scss'
import {
  AttendantRegisterValidation,
  CompanyRegisterValidation
} from '../../validate/RegisterValidation'

const { TabPane } = Tabs
const { Option } = Select

const genderType = [
  {
    title: 'Male',
    value: 'MALE'
  },
  {
    title: 'Female',
    value: 'FEMALE'
  }
]

const RegisterComponent = ({ form }) => {
  return (
    <div className="register-container">
      <Divider orientation="center" plain>
        <Typography.Title level={4}>Job Fair Online - Sign in</Typography.Title>
      </Divider>
      <Tabs defaultActiveKey="ATTENDANT" centered>
        <TabPane tab="ATTENDANT" key="ATTENDANT">
          <AttendantForm />
        </TabPane>
        <TabPane tab="COMPANY" key="COMPANY">
          <CompanyForm />
        </TabPane>
      </Tabs>
    </div>
  )
}

const AttendantForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} name="register" onFinish={() => {}} scrollToFirstError>
      <Form.Item name="firstName" rules={AttendantRegisterValidation.firstName}>
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        name="middleName"
        rules={AttendantRegisterValidation.middleName}
      >
        <Input placeholder="Middle name" />
      </Form.Item>
      <Form.Item name="lastName" rules={AttendantRegisterValidation.lastName}>
        <Input placeholder="Last name" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={AttendantRegisterValidation.gender}
      >
        <Select defaultValue="MALE" placeholder="select your gender">
          {genderType.map(gender => {
            return <Option value={gender.value}>{gender.title}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item name="email" rules={AttendantRegisterValidation.email}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={AttendantRegisterValidation.password}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={AttendantRegisterValidation.rePassword}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item className="login-text">
        <span>Already have an account?</span>{' '}
        <Button type="link">Login now!</Button>
      </Form.Item>
    </Form>
  )
}

const CompanyForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form} name="register" onFinish={() => {}} scrollToFirstError>
      <Form.Item
        name="companyName"
        rules={CompanyRegisterValidation.companyName}
      >
        <Input placeholder="Your company name" />
      </Form.Item>
      <Form.Item name="email" rules={CompanyRegisterValidation.email}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="taxId" rules={CompanyRegisterValidation.taxId}>
        <Input placeholder="Tax ID" />
      </Form.Item>
      <Form.Item name="address" rules={CompanyRegisterValidation.address}>
        <Input placeholder="Address" />
      </Form.Item>
      <Form.Item name="phone" rules={CompanyRegisterValidation.phone}>
        <Input placeholder="Phone number" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={CompanyRegisterValidation.password}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={CompanyRegisterValidation.rePassword}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item className="login-text">
        <span>Already have an account?</span>{' '}
        <Button type="link">Login now!</Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterComponent
