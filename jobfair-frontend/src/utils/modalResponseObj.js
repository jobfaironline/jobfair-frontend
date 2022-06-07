import { Typography } from 'antd';
import React from 'react';

export const modalResponseObj = (title, content, handleOnOk) => ({
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
