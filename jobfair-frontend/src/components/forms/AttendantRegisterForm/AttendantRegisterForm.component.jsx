import { AttendantRegisterValidation } from '../../../validate/RegisterValidation';
import { Button, Checkbox, Form, Input } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const AttendantRegisterFormComponent = ({ handleRegisterAttendant, form }) => {
  const history = useHistory();
  const [isAgree, setIsAgree] = useState(false);

  return (
    <div>
      <Form form={form} name='register' onFinish={handleRegisterAttendant} scrollToFirstError>
        <Form.Item
          label='First name'
          name='firstname'
          rules={AttendantRegisterValidation.firstName}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='First name' />
        </Form.Item>
        <Form.Item
          label='Middle name'
          name='middlename'
          rules={AttendantRegisterValidation.middleName}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Middle name' />
        </Form.Item>
        <Form.Item
          label='Last name'
          name='lastname'
          rules={AttendantRegisterValidation.lastName}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Last name' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={AttendantRegisterValidation.email}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input placeholder='Please use real email for verification' autoComplete='new-email' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={AttendantRegisterValidation.password}
          hasFeedback
          style={{ display: 'inline-block', width: '100%' }}>
          <Input.Password placeholder='At least 2 characters' autoComplete='new-password' />
        </Form.Item>
        <Form.Item
          label='Confirm password'
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={AttendantRegisterValidation.rePassword}
          style={{ display: 'inline-block', width: '100%' }}>
          <Input.Password placeholder='Confirm password' />
        </Form.Item>
        <div>
          <Checkbox onChange={(e) => setIsAgree(e.target.checked)}>
            <span>By clicking the "Register" button, I agree to the</span>{' '}
            <a type='link' onClick={() => history.push(PATH.FAQ_PAGE)}>
              Term of use
            </a>{' '}
            <span>and</span> <a onClick={() => history.push(PATH.FAQ_PAGE)}>Privacy Policy</a> <span>of JobHub</span>
          </Checkbox>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' disabled={!isAgree}>
            Register
          </Button>
        </Form.Item>
        <Form.Item className='login-text'>
          <span>Already have an account?</span>{' '}
          <Button type='link' onClick={() => history.push(PATH.LOGIN_PAGE)}>
            Login now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AttendantRegisterFormComponent;
