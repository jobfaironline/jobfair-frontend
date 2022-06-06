import { Space, Typography } from 'antd';
import React from 'react';

const RegisterFailedContentComponent = ({ email, message }) => (
  <Space direction='vertical'>
    <Typography.Text>Register failed for email: {email}</Typography.Text>
    <Typography.Text>{message}</Typography.Text>
  </Space>
);

export default RegisterFailedContentComponent;
