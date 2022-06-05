import { Typography } from 'antd';
import React from 'react';

export const modalErrorObject = (err) => ({
  title: 'Reset password failed !',
  width: '30rem',
  closable: true,
  maskClosable: true,
  content: <Typography.Text>{err.response.data.message}</Typography.Text>
});
