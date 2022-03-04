import React from 'react'
import { Button, Checkbox, Divider, Form, Input, Layout } from 'antd'

const ForgotPasswordComponent = ({ onFinish, form }) => {
  return (
    <>
      <Divider orientation="center" plain>
        FORGOT PASSWORD?
      </Divider>
      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }} form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rule={[
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'This field has invalid email format.'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <a href="/accounts/changepassword" style={{ marginLeft: 20 }}>
              Already have OTP? Change password now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default ForgotPasswordComponent
