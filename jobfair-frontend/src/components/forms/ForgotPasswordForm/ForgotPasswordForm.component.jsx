import './ForgotPasswordForm.scss';
import { Avatar, Button, Card, Form, Input, Typography } from 'antd';
import { ForgetPasswordValidation } from '../../../validate/ForgetPasswordValidation';
import { PATH } from '../../../constants/Paths/Path';
import React from 'react';

const ForgotPasswordFormComponent = ({ onFinish, form, handleSearchEmail, info }) => (
  <>
    <div className='container'>
      <div className='form'>
        <Card
          title='Forgot password'
          style={{
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            marginBottom: '2rem',
            width: '25%',
            height: '25rem'
          }}>
          <Form form={form} onFinish={onFinish} autoComplete='off'>
            <Form.Item
              label='Email'
              name='email'
              hasFeedback
              rules={ForgetPasswordValidation.email}
              style={{ marginTop: '2rem' }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <div style={info !== undefined ? { display: 'flex', justifyContent: 'center' } : { display: 'none' }}>
                <div>
                  <Avatar
                    src={info?.profileImageUrl}
                    size={{ xs: 10, sm: 15, md: 25, lg: 35, xl: 45, xxl: 55 }}
                    shape={'square'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                  <Typography.Text>{info?.email}</Typography.Text>
                  <a onClick={() => onFinish(form.getFieldsValue(true))}>Send OTP to this email</a>
                </div>
              </div>
            </Form.Item>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Form.Item>
                <Button
                  type='primary'
                  onClick={() => handleSearchEmail(form.getFieldValue('email'))}
                  className='button'
                  style={{ display: 'block', margin: '0 auto' }}>
                  Search
                </Button>
              </Form.Item>
              <a href={PATH.LOGIN_PAGE} style={{ display: 'block', margin: '0 auto' }}>
                Back to login page
              </a>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  </>
);
export default ForgotPasswordFormComponent;
