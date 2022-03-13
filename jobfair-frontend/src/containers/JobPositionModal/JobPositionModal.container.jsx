import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import {
  setJobPositionModalVisibility,
  setJobPositionSubmodalVisibility
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'

const JobPositionModalContainer = ({ visible, handleCloseModal }) => {
  return (
    <>
      <JobPositionModal visible={visible} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default JobPositionModalContainer
