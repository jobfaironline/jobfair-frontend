import React, {useState} from "react";
import {ControlTipsModal} from "../../components/AttendantJobFair/ControlTipsModal.component";

export const ControlTipsModalContainer = props => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openControlTips = () => {
    setIsModalVisible(true);
  }

  const closeControlTips = () => {
    setIsModalVisible(false)
  }

  const componentProps = {openControlTips, isModalVisible, closeControlTips }
  return <ControlTipsModal {...componentProps}/>
}