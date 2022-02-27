import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import {
  setJobPositionModalVisibility,
  setJobPositionSubmodalVisibility
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'

const JobPositionModalContainer = props => {
  const { setFinalSelectedJob } = props
  const dispatch = useDispatch()

  const visible = useSelector(state => state?.registrationJobfairForm?.jobPositionModalVisibility)

  const handleOk = async () => {
    await setTimeout(() => {
      dispatch(setJobPositionModalVisibility(false))
    }, 2000)
  }

  const handleCancel = () => {
    dispatch(setJobPositionModalVisibility(false))
  }

  const handleCreateOnClick = () => {
    dispatch(setJobPositionSubmodalVisibility(true))
  }
  return (
    <>
      <JobPositionModal
        visible={visible}
        setFinalSelectedJob={setFinalSelectedJob}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleCreateOnClick={handleCreateOnClick}
      />
    </>
  )
}

export default JobPositionModalContainer
