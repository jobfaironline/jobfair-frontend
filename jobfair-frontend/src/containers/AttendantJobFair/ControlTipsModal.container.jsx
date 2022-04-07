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

  const componentProps = { openControlTips, isModalVisible, closeControlTips };
  return <ControlTipsModal {...componentProps} />;
};
