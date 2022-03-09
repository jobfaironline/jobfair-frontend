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
import {fetchJobPositions} from "../../redux-flow/jobPositions/job-positions-action";
import {getJobPositionsAPI} from "../../services/job-controller/JobControllerService";

const PickJobPositionFormContainer = props => {
  const {form, onFinish } = props

  const jobPositionsInForm = useSelector(state => {
    return state?.registrationJobfairForm?.form?.body?.jobPositions
  })

  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({
      jobPositions: jobPositionsInForm
    })
  }, [jobPositionsInForm])

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
      <JobPositionSubmodal />
      <JobPositionModal setFinalSelectedJob={jobPositionsInForm} />
      <PickJobPositionForm
        jobPositions={jobPositionsInForm}
        handlePickJobPosition={handlePickJobPosition}
        form={form}
        onFinish={onFinish}
        handleRemove={handleRemove}
      />
    </>
  )
}

export default PickJobPositionFormContainer
