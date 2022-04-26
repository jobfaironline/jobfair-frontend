import { EmployeeRegisterValidation } from '../../../validate/EmployeeRegisterValidation';
import { Form, Input, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const EmployeeForm = ({ form, onFinish }) => (
  <div>
    <Title level={2}>Register new employee</Title>
    <Form
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
      layout='vertical'
      labelCol={21}
      wrapperCol={21}>
      <div style={{ display: 'flex' }}>
        <Form.Item
          name='firstName'
          label='First name'
          tooltip='What do you want others to call you?'
          rules={EmployeeRegisterValidation.firstName}
          style={{ marginRight: '1rem', flex: 1 }}>
          <Input placeholder='Enter your first name' />
        </Form.Item>

        <Form.Item
          name='middleName'
          label='Middle name'
          tooltip='What do you want others to call you?'
          rules={EmployeeRegisterValidation.middleName}
          style={{ marginRight: '1rem', flex: 1 }}>
          <Input placeholder='Enter your middle name' />
        </Form.Item>

        <Form.Item
          name='lastName'
          label='Last name'
          tooltip='What do you want others to call you?'
          rules={EmployeeRegisterValidation.lastName}
          style={{ flex: 1 }}>
          <Input placeholder='Enter your last name' />
        </Form.Item>
      </div>
      <div style={{ display: 'flex' }}>
        <Form.Item
          name='department'
          label='Department'
          tooltip='What do you want others to call you?'
          rules={EmployeeRegisterValidation.department}
          style={{ marginRight: '1rem', flex: 1 }}>
          <Input placeholder='Enter employee department' />
        </Form.Item>

        <Form.Item
          name='employeeId'
          label='Employee Id'
          tooltip='What do you want others to call you?'
          rules={EmployeeRegisterValidation.employeeId}
          style={{ flex: 1 }}>
          <Input placeholder="Employee's id" />
        </Form.Item>
      </div>
      <Form.Item name='email' label='E-mail' rules={EmployeeRegisterValidation.email}>
        <Input placeholder="Enter employee's email" />
      </Form.Item>
    </Form>
  </div>
);

export default EmployeeForm;
