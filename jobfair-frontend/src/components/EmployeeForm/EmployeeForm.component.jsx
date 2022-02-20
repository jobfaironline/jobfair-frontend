import React, { useState } from 'react'
import { Select, Button, Form, Input } from 'antd'
import { EmployeeRegisterValidation } from '../../validate/EmployeeRegisterValidation'
import { tailFormItemLayout, formItemLayout } from './EmployeeForm.style'

const { Option } = Select

const genderType = [
  {
    title: 'Male',
    value: 'MALE',
  },
  {
    title: 'Female',
    value: 'FEMALE',
  },
]

const EmployeeForm = ({ form, onFinish }) => {
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={EmployeeRegisterValidation.email}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={EmployeeRegisterValidation.password}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={EmployeeRegisterValidation.confirm}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.firstName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="middleName"
        label="Middle name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.middleName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.lastName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={EmployeeRegisterValidation.phone}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={EmployeeRegisterValidation.gender}
      >
        <Select placeholder="select your gender">
          {genderType.map(gender => {
            return <Option value={gender.value}>{gender.title}</Option>
          })}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EmployeeForm
