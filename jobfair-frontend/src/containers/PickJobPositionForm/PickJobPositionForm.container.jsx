import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PickJobPositionForm from '../../components/PickJobPositionForm/PickJobPositionForm.component'
import JobPositionModal from '../../containers/JobPositionModal/JobPositionModal.container'
import JobPositionSubmodal from '../../containers/JobPositionModal/JobPositionSubmodal.container'
import {
  setJobPositionModalVisibility,
  setJobPositions
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { Form } from 'antd'
import { useEffect } from 'react'
import { ConsoleSqlOutlined } from '@ant-design/icons'

const PickJobPositionFormContainer = props => {
  const { form, onFinish } = props

  const jobPositionsInRedux = useSelector(state => {
    return state?.registrationJobfairForm?.form?.body?.jobPositions
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const jobPositionsInForm = form?.getFieldsValue().jobPositions
    const jobPositionsInFormKeys = {}
    jobPositionsInForm?.forEach(jobPosition => {
      jobPositionsInFormKeys[jobPosition.key] = jobPosition
    })
    //This will map the old data with new picked data to keep the input data after refresh form
    const mappedData = jobPositionsInRedux.map(jobPosition => {
      if (jobPositionsInFormKeys[jobPosition.key]) {
        return jobPositionsInFormKeys[jobPosition.key]
      }
      return jobPosition
    })
    form.setFieldsValue({
      jobPositions: mappedData
    })
  }, [jobPositionsInRedux])

  const handlePickJobPosition = (name, add) => {
    dispatch(setJobPositionModalVisibility(true))
  }

  const handleRemove = (name, remove) => {
    remove(name)
    const mappedData = form.getFieldsValue().jobPositions
    dispatch(setJobPositions(mappedData))
  }

  return (
    <>
      <JobPositionModal setFinalSelectedJob={jobPositionsInRedux} />
      <PickJobPositionForm
        jobPositions={jobPositionsInRedux}
        handlePickJobPosition={handlePickJobPosition}
        form={form}
        onFinish={onFinish}
        handleRemove={handleRemove}
      />
    </>
  )
}

export default PickJobPositionFormContainer
