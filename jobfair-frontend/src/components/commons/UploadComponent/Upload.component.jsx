import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const UploadComponent = ({ uploadProps }) => {
  return (
    <Dragger {...uploadProps}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </Dragger>
  );
};

export default UploadComponent;