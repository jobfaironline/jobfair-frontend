import './ResetPasswordForm.scss';
import { Button, Card, Form, Input } from 'antd';
import { ChangePasswordValidation } from '../../../validate/ChangePasswordValidation';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import Typography from '@mui/material/Typography';

const ResetPasswordFormComponent = ({ onFinish, form, email, setOtpCode }) => {
  const handlePinChange = (otp) => {
    setOtpCode(otp);
  };
  return (
    <div className='container'>
      <Card
        title={`Reset password for email: ${email}`}
        style={{
          boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
          width: '30rem',
          marginTop: '5rem',
          display: 'block',
          margin: '0 auto'
        }}
        headStyle={{ backgroundColor: 'white', border: 0 }}
        bodyStyle={{ backgroundColor: 'white', border: 0 }}>
        <Form form={form} onFinish={onFinish} autoComplete='off'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography variant='h6' gutterBottom component='div'>
              OTP Code:
            </Typography>
            <ReactCodeInput id='pinCode' type='number' fields={6} onChange={handlePinChange} autoComplete={'false'} />
          </div>
          <Form.Item
            label='New password'
            name='newPassword'
            hasFeedback
            rules={ChangePasswordValidation.newPassword}
            style={{ display: 'inline-block', width: '100%' }}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Confirm password'
            name='confirmPassword'
            hasFeedback
            rules={ChangePasswordValidation.rePassword}
            style={{ display: 'inline-block', width: '100%' }}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' className='button'>
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ResetPasswordFormComponent;
