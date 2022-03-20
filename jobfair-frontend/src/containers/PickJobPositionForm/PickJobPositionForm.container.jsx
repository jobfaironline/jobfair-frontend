import React, { useEffect, useState } from 'react'
import PickJobPositionForm from '../../components/PickJobPositionForm/PickJobPositionForm.component'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import { getLatestCompanyRegistration } from '../../services/company-registration-controller/CompanyRegistrationControllerService'
import AnchorComponent from '../../components/Anchor/Achor.component'

const PickJobPositionFormContainer = ({ form }) => {
  const [modalVisibile, setModalVisible] = useState(false)
  const [anchorList, setAnchorList] = useState(
    form.getFieldsValue().jobPositions
      ? form.getFieldsValue().jobPositions.map(item => ({ href: '#' + item.id, title: item.title }))
      : []
  )

  const handlePickJobPosition = (name, add) => {
    setModalVisible(true)
  }

  const handleRemove = (name, remove) => {
    remove(name)
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map(item => ({ href: '#' + item.id, title: item.title }))
        : []
    )
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map(item => ({ href: '#' + item.id, title: item.title }))
        : []
    )
  }

  return (
    <>
      <div style={{ position: 'fixed', left: '0.8rem', top: '200px' }}>
        <AnchorComponent
          listData={
            form.getFieldsValue().jobPositions
              ? form.getFieldsValue().jobPositions.map(item => ({ href: '#' + item.id, title: item.title }))
              : []
          }
          href={'#description'}
          title={'Registration description'}
        />
      </div>
      <JobPositionModal visible={modalVisibile} handleCloseModal={handleCloseModal} form={form} />
      <PickJobPositionForm handlePickJobPosition={handlePickJobPosition} form={form} handleRemove={handleRemove} />
    </>
  )
}

export default PickJobPositionFormContainer
