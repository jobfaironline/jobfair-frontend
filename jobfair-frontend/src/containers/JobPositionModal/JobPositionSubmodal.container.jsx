import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, notification } from 'antd'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import { setJobPositionSubmodalVisibility } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { createJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action'

const JobPositionSubmodalContainer = ({ jobPositionId, visible, handleCloseModal }) => {
  const [data, setData] = useState(null)

  const jobPositions = useSelector(state => {
    return state?.jobPosition?.data
  })

  useEffect(() => {
    setData(jobPositions?.filter(item => item.id == jobPositionId)[0])
  }, [jobPositionId])

  return <JobPositionSubmodal visible={visible} handleCancel={handleCloseModal} data={data} />
}

export default JobPositionSubmodalContainer
