import { Button, Form, Input, Modal, Spin, notification } from 'antd';
import { getBase64 } from '../../utils/common';
import {
  uploadTemplateAPI,
  uploadTemplateMetaDataAPI,
  uploadThumbnailAPI
} from '../../services/jobhub-api/LayoutControllerService';
import ImgCrop from 'antd-img-crop';
import React, { useRef, useState } from 'react';
import UploadComponent from '../../components/commons/UploadComponent/Upload.component';

const { TextArea } = Input;
const UploadModalContainer = ({ visible, onCancel, onSubmit }) => {
  const glbFormData = useRef(new FormData());
  const thumbnailFormData = useRef(new FormData());

  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [hasUploadGlb, setHasUploadGlb] = useState(false);

  const [uploadState, setUploadState] = useState(false);

  const onFinish = async (values) => {
    const body = {
      name: values.name,
      description: values.description
    };
    setUploadState(true);
    const res = await uploadTemplateMetaDataAPI(body);
    await uploadTemplateAPI(res.data.id, glbFormData.current);
    await uploadThumbnailAPI(res.data.id, thumbnailFormData.current);
    notification['success']({
      message: `upload successfully`
    });
    setUploadState(false);
    //force render to fetch data after upload
    if (onSubmit) onSubmit();
  };

  const thumbnailUploadProps = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      const url = await getBase64(info.file);
      setThumbnailUrl(url);
      thumbnailFormData.current.append('file', info.file);
    },
    onRemove: async () => {
      setThumbnailUrl(undefined);
    },
    showUploadList: true,
    maxCount: 1
  };

  const glbUploadProps = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      const fileExtension = info.file.name.split('.').pop();
      if (fileExtension !== 'glb') {
        notification['error']({
          message: `${info.file.name} is not glb file`
        });
        return;
      }
      glbFormData.current.append('file', info.file);

      if (info.fileList.length > 0) setHasUploadGlb(true);
    },
    onRemove: async () => {
      setHasUploadGlb(false);
    },
    showUploadList: true,
    maxCount: 1
  };

  return (
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
            {hasUploadGlb ? <div>Override upload</div> : undefined}
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
          <div style={{ display: uploadState ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ marginRight: '10px' }}>Is uploading</span>
            <Spin style={{ display: 'flex' }} />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default UploadModalContainer;
