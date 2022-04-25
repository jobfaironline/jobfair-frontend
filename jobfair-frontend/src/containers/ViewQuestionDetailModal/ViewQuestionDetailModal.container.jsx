import { Modal } from 'antd';
import React from 'react';

const ViewQuestionDetailModalContainer = ({ visible, onCancel }) => (
  <div>
    <Modal visible={visible} title='View question detail' footer={null} onCancel={onCancel}>
      view detail
    </Modal>
  </div>
);

export default ViewQuestionDetailModalContainer;
