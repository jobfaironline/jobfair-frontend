import { Modal } from 'antd';
import React from 'react';

const AddQuestionModalContainer = ({ visible, onCancel }) => (
  <div>
    <Modal visible={visible} title='Add question' footer={null} onCancel={onCancel}>
      add question
    </Modal>
  </div>
);

export default AddQuestionModalContainer;
