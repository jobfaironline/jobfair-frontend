import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'

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
