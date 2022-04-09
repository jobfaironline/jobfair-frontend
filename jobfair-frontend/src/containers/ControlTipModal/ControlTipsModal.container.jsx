import { ControlTipsModal } from '../../components/commons/TipModal/ControlTipsModal.component';
import React, { useState } from 'react';

export const ControlTipsModalContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openControlTips = () => {
    setIsModalVisible(true);
  };

  const closeControlTips = () => {
    setIsModalVisible(false);
  };

  const controlMessage = () => (
    <>
      <p>Movement controls:</p>
      <p>W/S: Translate Forward/Backward</p>
      <p>A/D: Rotate Left/Right</p>
    </>
  );

  const componentProps = { openControlTips, isModalVisible, closeControlTips, controlMessage };
  return <ControlTipsModal {...componentProps} />;
};
