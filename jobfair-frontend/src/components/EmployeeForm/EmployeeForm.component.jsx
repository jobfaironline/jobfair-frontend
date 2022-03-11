import React from 'react'
import {Button, Form, Input, Popconfirm, Select} from 'antd'
import {EmployeeRegisterValidation} from '../../validate/EmployeeRegisterValidation'
import {formItemLayout, tailFormItemLayout} from './EmployeeForm.style'

const {Option} = Select

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

const EmployeeForm = ({form, onFinish}) => {
  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="email" label="E-mail" rules={EmployeeRegisterValidation.email}>
        <Input/>
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.firstName}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="middleName"
        label="Middle name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.middleName}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last name"
        tooltip="What do you want others to call you?"
        rules={EmployeeRegisterValidation.lastName}
      >
        <Input/>
      </Form.Item>

      <Form.Item name="phone" label="Phone Number" rules={EmployeeRegisterValidation.phone}>
        <Input
          style={{
            width: '100%'
          }}
        />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={EmployeeRegisterValidation.gender}>
        <Select defaultValue="MALE" placeholder="select your gender">
          {genderType.map(gender => {
            return <Option value={gender.value}>{gender.title}</Option>
          })}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => form.submit()}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
  )
}

export default EmployeeForm
