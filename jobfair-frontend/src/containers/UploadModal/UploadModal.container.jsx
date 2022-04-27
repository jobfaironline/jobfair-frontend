import { Button, Form, Input, Modal, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import React from 'react';
import UploadComponent from '../../components/commons/UploadComponent/Upload.component';

const { TextArea } = Input;
const UploadModalContainer = ({
  visible,
  onFinish,
  onCancel,
  glbUploadProps,
  thumbnailUploadProps,
  thumbnailUrl,
  isUploadGlb,
  isUploading
}) => (
  <Modal visible={visible} title={'Upload your template as .glb file'} footer={null} onCancel={onCancel} centered>
    <Form
      requiredMark='required'
      autoComplete='off'
      onFinish={onFinish}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.Item
        label='Name'
        name={'name'}
        rules={[]}
        style={{
          display: 'inline-block',
          width: '50%',
          marginRight: '1rem'
        }}>
        <Input placeholder='Name' />
      </Form.Item>
      <Form.Item
        label='Description'
        name={'description'}
        rules={[]}
        style={{
          display: 'inline-block',
          width: '100%',
          marginRight: '1rem'
        }}>
        <TextArea showCount maxLength={3000} placeholder='Description' style={{ height: '10rem' }} />
      </Form.Item>
      <Form.Item
        label='File glb'
        style={{
          display: 'inline-block',
          marginRight: '1rem'
        }}>
        <UploadComponent uploadProps={glbUploadProps}>
          {isUploadGlb ? <div>Override upload</div> : undefined}
        </UploadComponent>
      </Form.Item>
      <Form.Item
        label='Thumbnail'
        style={{
          display: 'inline-block',
          marginRight: '1rem'
        }}>
        <ImgCrop rotate>
          <UploadComponent uploadProps={thumbnailUploadProps}>
            {thumbnailUrl ? <img src={thumbnailUrl} alt='avatar' style={{ width: '100%' }} /> : undefined}
          </UploadComponent>
        </ImgCrop>
      </Form.Item>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button type='primary' htmlType='submit' style={{ marginRight: '1rem' }}>
          Upload
        </Button>
        <div style={{ display: isUploading ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: '10px' }}>Is uploading</span>
          <Spin style={{ display: 'flex' }} />
        </div>
      </div>
    </Form>
  </Modal>
);

export default UploadModalContainer;
