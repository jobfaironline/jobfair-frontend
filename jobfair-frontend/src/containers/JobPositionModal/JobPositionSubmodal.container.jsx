import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, notification } from 'antd'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import { setJobPositionSubmodalVisibility } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { createJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action'

const JobPositionSubmodalContainer = jobPositionId => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const jobPositions = useSelector(state => {
    return state?.jobPositions?.data
  })

  useEffect(() => {
    setVisible(true)
  }, [jobPositionId])

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <JobPositionSubmodal
      visible={visible}
      handleCancel={handleCancel}
      data={jobPositions?.filter(item => item.id == jobPositionId)[0]}
    />
  )
}

export default JobPositionSubmodalContainer
