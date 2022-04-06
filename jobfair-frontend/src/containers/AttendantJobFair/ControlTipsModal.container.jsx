import React, { useState } from 'react'
import { ControlTipsModal } from '../../components/AttendantJobFair/Booth/ControlTipsModal.component'

export const ControlTipsModalContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openControlTips = () => {
    setIsModalVisible(true)
  }

  const closeControlTips = () => {
    setIsModalVisible(false)
  }

  const componentProps = { openControlTips, isModalVisible, closeControlTips }
  return <ControlTipsModal {...componentProps} />
}
