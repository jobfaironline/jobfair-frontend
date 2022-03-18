import React, {useEffect, useState} from 'react'
import PickJobPositionForm from '../../components/PickJobPositionForm/PickJobPositionForm.component'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import {
  getLatestCompanyRegistration
} from "../../services/company-registration-controller/CompanyRegistrationControllerService";

const PickJobPositionFormContainer = ({form, rerender}) => {
  const [modalVisibile, setModalVisible] = useState(false)

  const handlePickJobPosition = (name, add) => {
    setModalVisible(true)
  }

  const handleRemove = (name, remove) => {
    remove(name)
    rerender({})

  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <JobPositionModal visible={modalVisibile} handleCloseModal={handleCloseModal} form={form} rerender={rerender}/>
      <PickJobPositionForm
        handlePickJobPosition={handlePickJobPosition}
        form={form}
        handleRemove={handleRemove}
      />
    </>
  )
}

export default PickJobPositionFormContainer
