import { Button, Form, Input, Select } from 'antd';
import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import React from 'react';

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

const departmentType = [
  {
    title: 'Head Office',
    value: 'HEAD_OFFICE'
  },
  {
    title: 'Marketing',
    value: 'MARKETING'
  },
  {
    title: 'Finance',
    value: 'FINANCE'
  },
  {
    title: 'Sales',
    value: 'SALES'
  },
  {
    title: 'Human Resource',
    value: 'HUMAN_RESOURCES'
  },
  {
    title: 'Purchase',
    value: 'PURCHASE'
  }
];
const CompanyManagerRegisterFormComponent = ({ form, handleRegisterCompanyManager }) => (
  <div>
    <Form form={form} onFinish={handleRegisterCompanyManager} scrollToFirstError>
      <Form.Item
        label='Email'
        name='email'
        rules={CompanyRegisterValidation.email}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Email' autoComplete='new-email' />
      </Form.Item>
      <Form.Item
        label='First name'
        name='firstName'
        rules={CompanyRegisterValidation.firstName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='First name' />
      </Form.Item>
      <Form.Item
        label='Middle name'
        name='middleName'
        rules={CompanyRegisterValidation.middleName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Middle name' />
      </Form.Item>
      <Form.Item
        label='Last name'
        name='lastName'
        rules={CompanyRegisterValidation.lastName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Last name' />
      </Form.Item>
      <Form.Item
        name='gender'
        label='Gender'
        rules={CompanyRegisterValidation.gender}
        style={{ display: 'inline-block', width: '100%' }}>
        <Select defaultValue='Select gender...'>
          {genderType.map((gender) => (
            <Select.Option value={gender.value}>{gender.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='department'
        label='Department'
        rules={CompanyRegisterValidation.department}
        style={{ display: 'inline-block', width: '100%' }}>
        <Select defaultValue='Select department...'>
          {departmentType.map((gender) => (
            <Select.Option value={gender.value}>{gender.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Phone'
        name='phone'
        rules={CompanyRegisterValidation.phone}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Phone number' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={CompanyRegisterValidation.password}
        style={{ display: 'inline-block', width: '100%' }}
        hasFeedback>
        <Input.Password placeholder='Password' autoComplete='new-password' />
      </Form.Item>
      <Form.Item
        label='Confirm password'
        name='confirm'
        dependencies={['password']}
        style={{ display: 'inline-block', width: '100%' }}
        hasFeedback
        rules={CompanyRegisterValidation.rePassword}>
        <Input.Password placeholder='Confirm password' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Register
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default CompanyManagerRegisterFormComponent;
