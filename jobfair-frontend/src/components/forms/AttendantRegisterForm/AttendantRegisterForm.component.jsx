import { AttendantRegisterValidation } from '../../../validate/RegisterValidation';
import { Button, Form, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const AttendantRegisterFormComponent = ({ handleRegisterAttendant, form, genderType }) => (
  <div>
    <Form form={form} name='register' onFinish={handleRegisterAttendant} scrollToFirstError>
      <Form.Item name='firstname' rules={AttendantRegisterValidation.firstName}>
        <Input placeholder='First name' />
      </Form.Item>
      <Form.Item name='middlename' rules={AttendantRegisterValidation.middleName}>
        <Input placeholder='Middle name' />
      </Form.Item>
      <Form.Item name='lastname' rules={AttendantRegisterValidation.lastName}>
        <Input placeholder='Last name' />
      </Form.Item>
      <Form.Item name='phone' rules={AttendantRegisterValidation.phone}>
        <Input addonBefore={<FontAwesomeIcon icon={faPhone} />} placeholder='Phone' />
      </Form.Item>
      <Form.Item
        name='gender'
        label='Gender'
        rules={AttendantRegisterValidation.gender}
        style={{ display: 'inline-block', width: '100%' }}>
        <Select defaultValue='Select gender...'>
          {genderType.map((gender) => (
            <Select.Option value={gender.value}>{gender.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='email' rules={AttendantRegisterValidation.email}>
        <Input placeholder='Email' autoComplete='new-email' />
      </Form.Item>

      <Form.Item name='password' rules={AttendantRegisterValidation.password} hasFeedback>
        <Input.Password placeholder='Password' autoComplete='new-password' />
      </Form.Item>

      <Form.Item name='confirm' dependencies={['password']} hasFeedback rules={AttendantRegisterValidation.rePassword}>
        <Input.Password placeholder='Confirm password' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Register
        </Button>
      </Form.Item>
      <Form.Item className='login-text'>
        <span>Already have an account?</span> <Button type='link'>Login now!</Button>
      </Form.Item>
    </Form>
  </div>
);

export default AttendantRegisterFormComponent;
