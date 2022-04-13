import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import UploadComponent from '../../components/commons/UploadComponent/Upload.component';

const { TextArea } = Input;
const UploadModalContainer = ({ visible, setVisible, onFinish, ...uploadProps }) => {
  const onCancel = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();
  return (
    <Modal visible={visible} title={'Upload your template as .glb file'} footer={null} onCancel={onCancel}>
      <Form
        form={form}
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
            width: '75%',
            marginRight: '1rem'
          }}>
          <TextArea showCount maxLength={3000} placeholder='Description' style={{ height: '10rem' }} />
        </Form.Item>
        <Form.Item>
          <UploadComponent {...uploadProps} />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Upload
        </Button>
      </Form>
    </Modal>
  );
};

export default UploadModalContainer;
