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
  // const FormInRedux = useSelector(state => state?.registrationJobfairForm?.form?.body)

  // if (Object.keys(form.getFieldsValue()).length == 0) {
  //   form.setFieldsValue({
  //     description: FormInRedux.description,
  //     jobPositions: FormInRedux.jobPositions
  //   })
  // }

  // const jobPositionsInRedux = useSelector(state => {
  //   return state?.registrationJobfairForm?.form?.body?.jobPositions
  // })

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const jobPositionsInForm = form?.getFieldsValue().jobPositions
  //   const jobPositionsInFormKeys = {}
  //   jobPositionsInForm?.forEach(jobPosition => {
  //     jobPositionsInFormKeys[jobPosition.key] = jobPosition
  //   })
  //   //This will map the old data with new picked data to keep the input data after refresh form
  //   const mappedData = jobPositionsInRedux.map(jobPosition => {
  //     if (jobPositionsInFormKeys[jobPosition.key]) {
  //       return jobPositionsInFormKeys[jobPosition.key]
  //     }
  //     return jobPosition
  //   })
  //   form.setFieldsValue({
  //     jobPositions: mappedData
  //   })
  // }, [jobPositionsInRedux])

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
