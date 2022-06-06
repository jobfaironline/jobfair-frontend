import { Button, Form, Input, Space, Typography } from 'antd';
import { CompanyRegisterValidation } from '../../../validate/RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import React from 'react';

const CompanyManagerRegisterFormComponent = ({ form, onNext, onFinish, isError }) => (
  <div>
    <Space size='middle'>
      <Typography.Text strong>Company manager detail</Typography.Text>
      <a onClick={onNext}>
        <FontAwesomeIcon icon={faArrowRight} /> Next
      </a>
    </Space>
    <Form form={form} onFinish={onFinish} preserve={true}>
      <Form.Item
        label='Email'
        name='email'
        preserve={true}
        rules={CompanyRegisterValidation.email}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Please use real email for verification' autoComplete='new-email' />
      </Form.Item>
      <Form.Item
        label='First name'
        name='firstName'
        preserve={true}
        rules={CompanyRegisterValidation.firstName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='First name' />
      </Form.Item>
      <Form.Item
        label='Middle name'
        name='middleName'
        preserve={true}
        rules={CompanyRegisterValidation.middleName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Middle name' />
      </Form.Item>
      <Form.Item
        label='Last name'
        name='lastName'
        preserve={true}
        rules={CompanyRegisterValidation.lastName}
        style={{ display: 'inline-block', width: '100%' }}>
        <Input placeholder='Last name' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        preserve={true}
        rules={CompanyRegisterValidation.password}
        style={{ display: 'inline-block', width: '100%' }}
        hasFeedback>
        <Input.Password placeholder='At least 2 characters' autoComplete='new-password' />
      </Form.Item>
      <Form.Item
        label='Confirm password'
        name='confirm'
        preserve={true}
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
