import { Button, Modal } from 'antd';
import React from 'react';

export const ControlTipsModal = (props) => {
  const { openControlTips, isModalVisible, closeControlTips } = props;
  return (
    <>
      <Button
        type='primary'
        shape='circle'
        style={{ zIndex: 1000, position: 'absolute', right: 0 }}
        onClick={openControlTips}>
        i
      </Button>
      <Modal
        title='Control'
        visible={isModalVisible}
        mask={false}
        footer={null}
        onCancel={closeControlTips}
        centered={true}>
        {props.children}
      </Modal>
    </>
  );
};
