import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import JobPositionModal from '../../components/JobPositionModal/JobPositionModal.component'
import {setJobPositionModalVisibility} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'

const JobPositionModalContainer = props => {
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

  return (
    <>
      <JobPositionModal visible={visible} handleOk={handleOk} handleCancel={handleCancel}/>
    </>
  )
}

export default JobPositionModalContainer
