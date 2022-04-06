import React from 'react'
import { Button, Divider, Form, Input } from 'antd'
import Typography from '@mui/material/Typography'
import ReactCodeInput from 'react-code-input'
import { ChangePasswordValidation } from '../../validate/ChangePasswordValidation'
import './ResetPassword.scss'

const ResetPasswordComponent = ({ onFinish, form, email, setOtpCode }) => {
  const handlePinChange = otp => {
    setOtpCode(otp)
  }
  return (
    <div className="container">
      <Divider orientation="center" plain>
        Reset Password Page
      </Divider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} form={form} onFinish={onFinish} autoComplete="off">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom component="div">
              OTP Code:
            </Typography>
            <ReactCodeInput id="pinCode" type="text" fields={6} onChange={handlePinChange} />
          </div>
          {!email ? (
            <Form.Item label="Email" name="email" hasFeedback rules={ChangePasswordValidation.email}>
              <Input />
            </Form.Item>
          ) : null}
          <Form.Item label="newPassword" name="newPassword" hasFeedback rules={ChangePasswordValidation.newPassword}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="confirmPassword"
            name="confirmPassword"
            hasFeedback
            rules={ChangePasswordValidation.rePassword}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default ResetPasswordComponent
