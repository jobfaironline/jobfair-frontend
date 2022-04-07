import './ForgotPasswordForm.scss';
import { Button, Divider, Form, Input } from 'antd';
import { ForgetPasswordValidation } from '../../../validate/ForgetPasswordValidation';
import { PATH } from '../../../constants/Paths/Path';
import React from 'react';

const ForgotPasswordFormComponent = ({ onFinish, form }) => (
  <div className='container'>
    <div className='topElement'>
      <Divider orientation='center' plain>
        FORGOT PASSWORD?
      </Divider>
    </div>
    <div className='form'>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} form={form} onFinish={onFinish} autoComplete='off'>
        <Form.Item label='Email' name='email' hasFeedback rule={ForgetPasswordValidation.email}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' className='button'>
            Submit
          </Button>
          <a href={PATH.RESET_PASSWORD_PAGE} style={{ marginLeft: 20 }}>
            Already have OTP? Reset password now!
          </a>
        </Form.Item>
      </Form>
    </div>
  </div>
);
export default ForgotPasswordFormComponent;