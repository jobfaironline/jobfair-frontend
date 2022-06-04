import { Button, Form, Input, Space, Typography } from 'antd';
import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import React from 'react';

const CompanyManagerRegisterFormComponent = ({ form, onNext, onFinish }) => (
  <div>
    <Space size='middle'>
      <Typography.Text strong>Company manager detail</Typography.Text>
      <a onClick={onNext}>
        <FontAwesomeIcon icon={faArrowRight} /> Next
      </a>
    </Space>
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label='Email'
        name='email'
        rules={CompanyRegisterValidation.email}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Please use real email for verification' autoComplete='new-email' />
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
        label='Password'
        name='password'
        rules={CompanyRegisterValidation.password}
        style={{ display: 'inline-block', width: '100%' }}
        hasFeedback>
        <Input.Password placeholder='At least 2 characters' autoComplete='new-password' />
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
        <Button type='primary' onClick={onNext}>
          Continue
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default CompanyManagerRegisterFormComponent;
