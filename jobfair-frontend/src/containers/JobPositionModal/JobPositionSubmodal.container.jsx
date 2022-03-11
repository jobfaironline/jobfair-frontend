import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'

const JobPositionSubmodalContainer = ({jobPositionId}) => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)

  const dispatch = useDispatch()

  const jobPositions = useSelector(state => {
    return state?.jobPosition?.data
  })

  useEffect(() => {
    setData(jobPositions?.filter(item => item.id == jobPositionId)[0])
    setVisible(true)
  }, [jobPositionId])

  const handleCancel = () => {
    setVisible(false)
  }

  return <JobPositionSubmodal visible={visible} handleCancel={handleCancel} data={data}/>
}

export default JobPositionSubmodalContainer
