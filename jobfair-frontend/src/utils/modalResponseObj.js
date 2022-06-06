import { Typography } from 'antd';
import React from 'react';

export const modalSuccessObject = (handleOnOk, title, content) => ({
  title,
  width: '30rem',
  closable: true,
  maskClosable: true,
  onOk: handleOnOk,
  keyboard: false,
  content: (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography.Text>{content}</Typography.Text>
    </div>
  )
});

export const modalErrorObject = (err, title) => ({
  title,
  width: '30rem',
  closable: true,
  maskClosable: true,
  content: <Typography.Text>{err.response.data.message}</Typography.Text>
});
