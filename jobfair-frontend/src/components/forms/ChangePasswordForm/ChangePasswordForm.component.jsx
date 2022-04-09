import { Button, Form, Input } from 'antd';
import { ChangePasswordValidation } from '../../../validate/ChangePasswordValidation';
import React from 'react';

const ChangePasswordFormComponent = (props) => {
  const { form, onFinish } = props;
  return (
    <div className='input-container' style={{ width: '75%', marginTop: '5%', marginLeft: '15%' }}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        form={form}
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <Form.Item
          label='Your old password'
          name='oldPassword'
          hasFeedback
          rules={ChangePasswordValidation.oldPassword}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Your new password'
          name='newPassword'
          hasFeedback
          rules={ChangePasswordValidation.newPassword}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Confirm your new password'
          name='confirmPassword'
          hasFeedback
          rules={ChangePasswordValidation.rePassword}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ marginLeft: '100%' }}>
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordFormComponent;
