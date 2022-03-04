import React from 'react'
import { Button, Checkbox, Divider, Form, Input, Layout, InputNumber } from 'antd'
import Typography from '@mui/material/Typography'
import ReactCodeInput from 'react-code-input'
const ChangePasswordComponent = ({ onFinish, form, email, setOtpCode }) => {
  const handlePinChange = otp => {
    setOtpCode(otp)
  }
  return (
    <>
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
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              rules={[
                { required: true, message: 'Please input your email!' },
                {
                  type: 'email',
                  message: 'This field has invalid email format.'
                }
              ]}
            >
              <Input />
            </Form.Item>
          ) : null}
          <Form.Item
            label="newPassword"
            name="newPassword"
            hasFeedback
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="confirmPassword"
            name="confirmPassword"
            hasFeedback
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default ChangePasswordComponent
