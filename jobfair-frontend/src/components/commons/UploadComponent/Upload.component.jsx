import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React from 'react';

const { Dragger } = Upload;

const UploadComponent = ({ uploadProps, disabled, isImageCrop, aspect, ...props }) => {
  const dragger = (
    <Dragger {...uploadProps} disabled={disabled}>
      {props.children === undefined ? (
        <>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
          </p>
        </>
      ) : (
        props.children
      )}
    </Dragger>
  );
  return isImageCrop ? <ImgCrop aspect={aspect}>{dragger}</ImgCrop> : dragger;
};

export default UploadComponent;
