import React from 'react'
import { Button, Checkbox, Divider, Form, Input, Layout } from 'antd'
const ChangePasswordComponent = ({ onFinish, form }) => {
  return (
    <>
      <Divider orientation="center" plain>
        Reset Password Page
      </Divider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="otp"
            name="otp"
            hasFeedback
            rules={[
              { required: true, message: 'Please input your otp code!' },
              {
                message: 'This field has invalid email format.'
              }
            ]}
          >
            <Input />
          </Form.Item>
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
