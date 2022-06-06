import { Typography } from 'antd';
import React from 'react';

export const modalSuccessObject = (handleOnOk) => ({
  title: 'Reset password successfully !',
  width: '30rem',
  closable: true,
  maskClosable: true,
  onOk: handleOnOk,
  keyboard: false,
  content: (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography.Text>Your password has been updated</Typography.Text>
    </div>
  )
});
