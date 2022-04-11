import React from 'react';
import { Modal } from 'antd';
import UploadComponent from '../../components/commons/UploadComponent/Upload.component';

const UploadModalContainer = ({ uploadProps, visible, setVisible }) => {
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} title={'Upload your template as .glb file'} footer={null} onCancel={onCancel}>
      <UploadComponent {...uploadProps} />
    </Modal>
  );
};

export default UploadModalContainer;
