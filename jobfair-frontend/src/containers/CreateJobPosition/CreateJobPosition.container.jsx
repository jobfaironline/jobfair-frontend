import React from 'react'
import CreateJobPositionForm from '../../components/create-job-position-form/CreateJobPositionForm'
import { Button, Form, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { createJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { useSelector } from 'react-redux'

const CreateJobPositionContainer = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const companyId = useSelector(state => state?.authentication?.user?.companyId)

  const onFinish = values => {
    createJobPositionsAPI({
      ...values,
      companyId: companyId
    })
      .then(res => {
        notification['success']({
          message: `Create job position data successfully`,
          description: `😘 😘 😘`
        })
        form.resetFields()
        history.goBack()
      })
      .catch(e => {
        notification['error']({
          message: `Create job position data failed`,
          description: `Error detail: ${e}`
        })
      })
  }

  return <CreateJobPositionForm form={form} onFinish={onFinish} />
}

export default CreateJobPositionContainer
