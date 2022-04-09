import { Button, Card, Form, Input, Popconfirm, Select } from 'antd';
import { EmployeeRegisterValidation } from '../../../validate/EmployeeRegisterValidation';
import { formItemLayout } from './EmployeeForm.style';
import React from 'react';

const { Option } = Select;

const genderType = [
  {
    title: 'Male',
    value: 'MALE'
  },
  {
    title: 'Female',
    value: 'FEMALE'
  }
];

const EmployeeForm = ({ form, onFinish }) => (
  <Card title='Create employee account form' style={{ width: '40%', margin: '3rem auto' }}>
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
      layout='vertical'
      labelCol={21}
      wrapperCol={21}>
      <Form.Item name='email' label='E-mail' rules={EmployeeRegisterValidation.email}>
        <Input placeholder='Enter your email' />
      </Form.Item>

      <Form.Item
        name='firstName'
        label='First name'
        tooltip='What do you want others to call you?'
        rules={EmployeeRegisterValidation.firstName}
        style={{ display: 'inline-block', width: '30%', marginRight: '1rem' }}>
        <Input placeholder='Enter your first name' />
      </Form.Item>

      <Form.Item
        name='middleName'
        label='Middle name'
        tooltip='What do you want others to call you?'
        rules={EmployeeRegisterValidation.middleName}
        style={{ display: 'inline-block', width: '30%', marginRight: '1rem' }}>
        <Input placeholder='Enter your middle name' />
      </Form.Item>

      <Form.Item
        name='lastName'
        label='Last name'
        tooltip='What do you want others to call you?'
        rules={EmployeeRegisterValidation.lastName}
        style={{ display: 'inline-block', width: '30%', marginRight: '1rem' }}>
        <Input placeholder='Enter your last name' />
      </Form.Item>

      <Form.Item
        name='phone'
        label='Phone Number'
        rules={EmployeeRegisterValidation.phone}
        style={{ display: 'inline-block', width: '45%', marginRight: '1rem' }}>
        <Input placeholder='Enter your phone number' />
      </Form.Item>

      <Form.Item
        name='gender'
        label='Gender'
        rules={EmployeeRegisterValidation.gender}
        style={{ display: 'inline-block', width: '20%' }}>
        <Select defaultValue='MALE' placeholder='select your gender'>
          {genderType.map((gender) => (
            <Option value={gender.value}>{gender.title}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 21 }}>
        <Popconfirm title='Are you sure？' okText='Yes' cancelText='No' onConfirm={() => form.submit()}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
  </Card>
);

export default EmployeeForm;
