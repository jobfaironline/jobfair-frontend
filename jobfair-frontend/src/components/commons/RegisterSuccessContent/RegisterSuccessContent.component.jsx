import { Space, Typography } from 'antd';
import React from 'react';

const RegisterSuccessContentComponent = ({ email }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Typography.Title level={3} style={{ display: 'block', margin: '0 auto' }}>
      Please check your email address
    </Typography.Title>
    <Typography.Paragraph style={{ display: 'block', margin: '0 auto', marginTop: '2rem' }}>
      <Space direction='vertical'>
        <div>
          <Typography.Text>An confirmation email has been sent to {email}</Typography.Text>
          <Typography.Text strong> </Typography.Text>
        </div>
        <Typography.Text>Please check your inbox and follow the instruction</Typography.Text>
      </Space>
    </Typography.Paragraph>
  </div>
);

export default RegisterSuccessContentComponent;
