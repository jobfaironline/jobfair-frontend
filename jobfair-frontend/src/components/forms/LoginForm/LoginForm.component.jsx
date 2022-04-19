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
        <Typography.Title level={4}>JobHub - Login</Typography.Title>
      </Divider>
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete='off'
          requiredMark={false}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}>
          <Form.Item label='Email' name='email' hasFeedback rules={LoginValidation.email}>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' hasFeedback rules={LoginValidation.password}>
            <Input.Password />
          </Form.Item>
          <Form.Item className='login' wrapperCol={{ offset: 5, span: 20 }}>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
          <Form.Item className='forgot-password' wrapperCol={{ offset: 5, span: 20 }}>
            <Button type='link' style={{ padding: 0 }} onClick={() => history.push(PATH.FORGOT_PASSWORD_PAGE)}>
              Forgot password?
            </Button>
          </Form.Item>
          <Divider style={{ margin: '1rem' }} />
          <Form.Item className='register' style={{ flexDirection: 'column', alignItems: 'center' }}>
            <span>Don't you have an account?</span> <Button type='link'>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginFormComponent;
