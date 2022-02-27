import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, notification } from 'antd'
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import { setJobPositionSubmodalVisibility } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { createJobPositionsAPI } from '../../services/jobPositionsService'
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action'

const JobPositionSubmodalContainer = () => {
  const [form] = Form.useForm()
  const visible = useSelector(state => state?.registrationJobfairForm?.jobPositionSubmodalVisibility)
  const companyId = useSelector(state => state?.authentication?.user?.companyId)
  const dispatch = useDispatch()

  const handleOk = async () => {
    await setTimeout(() => {
      form.submit()
      dispatch(setJobPositionSubmodalVisibility(false))
    }, 2000)
  }

  const handleCancel = () => {
    dispatch(setJobPositionSubmodalVisibility(false))
  }

  const onFinish = values => {
    createJobPositionsAPI({
      ...values,
      companyId: companyId
    })
      .then(res => {
        notification['success']({
          message: `Create job position data successfully`,
          description: `Yay`
        })
        form.resetFields()
        dispatch(fetchJobPositions())
      })
      .catch(e => {
        notification['error']({
          message: `Create job position data failed`,
          description: `try again later`
        })
      })
  }

  return (
    <JobPositionSubmodal
      visible={visible}
      handleCancel={handleCancel}
      handleOk={handleOk}
      form={form}
      onFinish={onFinish}
    />
  )
}

export default JobPositionSubmodalContainer
