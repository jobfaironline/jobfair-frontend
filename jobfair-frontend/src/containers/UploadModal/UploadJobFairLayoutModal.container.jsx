import { Button, Form, Input, Modal, Spin, Typography, notification } from 'antd';
import { UploadTemplateValidation } from '../../validate/UploadTemplateValidation';
import { getBase64 } from '../../utils/common';
import {
  uploadTemplateAPI,
  uploadTemplateMetaDataAPI,
  uploadThumbnailAPI
} from '../../services/jobhub-api/LayoutControllerService';
import React, { useRef, useState } from 'react';
import UploadComponent from '../../components/commons/UploadComponent/Upload.component';

const { TextArea } = Input;
const { Text } = Typography;
const UploadJobFairLayoutModalContainer = ({ visible, onCancel, onSubmit }) => {
  const glbFormData = useRef(new FormData());
  const thumbnailFormData = useRef(new FormData());
  const cropThumbnailFileRef = useRef();

  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [hasUploadGlb, setHasUploadGlb] = useState(false);

  const [uploadState, setUploadState] = useState(false);
  const [glbHasError, setGlbHasError] = useState(false);
  const [thumbnailHasError, setThumbnailHasError] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (glbHasError || thumbnailHasError) return;
    const body = {
      name: values.name,
      description: values.description
    };
    setUploadState(true);
    const res = await uploadTemplateMetaDataAPI(body);
    try {
      await uploadTemplateAPI(res.data.id, glbFormData.current);
    } catch (e) {
      setGlbHasError(true);
      return;
    }
    try {
      await uploadThumbnailAPI(res.data.id, thumbnailFormData.current);
    } catch (e) {
      setThumbnailHasError(true);
      return;
    }
    notification['success']({
      message: `upload successfully`
    });
    resetState();
    //force render to fetch data after upload
    if (onSubmit) onSubmit();
  };

  const thumbnailUploadProps = {
    name: 'file',
    beforeUpload: (file) => {
      cropThumbnailFileRef.current = file;
      return false;
    },
    onChange: async (info) => {
      if (info.fileList.length === 0) return;
      if (info.file.type !== 'image/png' && info.file.type !== 'image/jpeg') {
        notification['error']({
          message: `${info.file.name} is not png/jpeg file`
        });
        setThumbnailHasError(true);
        return;
      }
      const url = await getBase64(cropThumbnailFileRef.current);
      setThumbnailUrl(url);
      thumbnailFormData.current.append('file', cropThumbnailFileRef.current);
      setThumbnailHasError(false);
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
      if (info.fileList.length === 0) return;
      const fileExtension = info.file.name.split('.').pop();
      if (fileExtension !== 'glb') {
        setGlbHasError(true);

        notification['error']({
          message: `${info.file.name} is not glb file`
        });
        return;
      }
      glbFormData.current.append('file', info.file);
      setGlbHasError(false);

      if (info.fileList.length > 0) setHasUploadGlb(true);
    },
    onRemove: async () => {
      setHasUploadGlb(false);
    },
    showUploadList: true,
    maxCount: 1
  };

  const onSubmitClick = () => {
    if (!glbFormData.current.get('file')) setGlbHasError(true);
    if (!thumbnailFormData.current.get('file')) setThumbnailHasError(true);
  };

  const onInternalCancel = () => {
    onCancel();
    resetState();
  };

  const resetState = () => {
    glbFormData.current = new FormData();
    thumbnailFormData.current = new FormData();
    setThumbnailUrl(undefined);
    setHasUploadGlb(undefined);
    setUploadState(false);
    setGlbHasError(false);
    setThumbnailHasError(false);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title={'Upload your template as .glb file'}
      footer={null}
      onCancel={onInternalCancel}
      centered>
      <Text>
        <Text strong={true}>Attention:</Text> Your glb file must follow some rules for JobHub being able to process your
        layout. Click <a style={{ fontWeight: 600 }}>here</a> to see the detail documentation
      </Text>
      <Form
        form={form}
        requiredMark='required'
        autoComplete='off'
        onFinish={onFinish}
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <Form.Item
          label='Name'
          name={'name'}
          rules={UploadTemplateValidation.name}
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
          rules={UploadTemplateValidation.description}
          style={{
            display: 'inline-block',
            width: '100%',
            marginRight: '1rem'
          }}>
          <TextArea showCount maxLength={3000} placeholder='Description' style={{ height: '10rem' }} />
        </Form.Item>
        <Form.Item
          label='File glb'
          required={true}
          rules={UploadTemplateValidation.fileGLB}
          style={{
            display: 'inline-block',
            marginRight: '1rem'
          }}>
          <UploadComponent uploadProps={glbUploadProps}>
            {hasUploadGlb ? <div>Override upload</div> : undefined}
          </UploadComponent>
          {glbHasError ? (
            <Typography.Text style={{ color: 'red' }}>
              {!glbFormData.current.get('file') ? 'File glb is required' : 'Invalid glb file'}
            </Typography.Text>
          ) : null}
        </Form.Item>
        <Form.Item
          label='Thumbnail'
          required={true}
          style={{
            display: 'inline-block',
            marginRight: '1rem'
          }}>
          <UploadComponent uploadProps={thumbnailUploadProps} isImageCrop={true} aspect={2 / 1}>
            {thumbnailUrl ? <img src={thumbnailUrl} alt='avatar' style={{ width: '100%' }} /> : undefined}
          </UploadComponent>
          {thumbnailHasError ? (
            <Typography.Text style={{ color: 'red' }}>
              {!thumbnailFormData.current.get('file') ? 'Thumbnail is required' : 'Invalid thumbnail file'}
            </Typography.Text>
          ) : null}
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button type='primary' htmlType='submit' style={{ marginRight: '1rem' }} onClick={onSubmitClick}>
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

export default UploadJobFairLayoutModalContainer;
