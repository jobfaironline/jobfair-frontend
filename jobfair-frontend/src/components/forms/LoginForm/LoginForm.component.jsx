import './LoginForm.styles.scss';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { LoginValidation } from '../../../validate/LoginValidation';
import { PATH } from '../../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import React from 'react';

const LoginFormComponent = ({ onFinish, form }) => {
  const history = useHistory();
  return (
    <>
      <Divider orientation='center' plain>
        <Typography.Title level={4}>Job Fair Online - Login</Typography.Title>
      </Divider>
      <div className='input-container'>
        <Form className='login-form' form={form} onFinish={onFinish} autoComplete='off' requiredMark={false}>
          <Form.Item label='Email' name='email' hasFeedback rules={LoginValidation.email}>
            <Input style={{ marginLeft: '2rem' }} />
          </Form.Item>
          <Form.Item label='Password' name='password' hasFeedback rules={LoginValidation.password}>
            <Input.Password style={{ marginLeft: '0.5rem' }} />
          </Form.Item>
          <Form.Item className='login'>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
          <Form.Item className='forgot-password'>
            <Button type='link' onClick={() => history.push(PATH.FORGOT_PASSWORD_PAGE)}>
              Forgot password?
            </Button>
          </Form.Item>
          <Form.Item className='register'>
            <span>Don't you have an account?</span> <Button type='link'>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginFormComponent;
