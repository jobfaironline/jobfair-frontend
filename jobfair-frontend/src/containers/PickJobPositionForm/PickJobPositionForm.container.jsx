import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PickJobPositionForm from '../../components/PickJobPositionForm/PickJobPositionForm.component'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import {
  setJobPositionModalVisibility,
  setJobPositions
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { Form } from 'antd'
import { useEffect } from 'react'
import { ConsoleSqlOutlined } from '@ant-design/icons'

const PickJobPositionFormContainer = ({ form }) => {
  const [modalVisibile, setModalVisible] = useState(false)

  const handlePickJobPosition = (name, add) => {
    setModalVisible(true)
  }

  const handleRemove = (name, remove) => {
    remove(name)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <JobPositionModal visible={modalVisibile} handleCloseModal={handleCloseModal} form={form} />
      <PickJobPositionForm handlePickJobPosition={handlePickJobPosition} form={form} handleRemove={handleRemove} />
    </>
  )
}

export default PickJobPositionFormContainer
