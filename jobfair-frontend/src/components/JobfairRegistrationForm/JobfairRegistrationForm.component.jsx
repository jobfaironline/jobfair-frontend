import React from 'react'
import { Button, Form, Typography } from 'antd'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import TextArea from 'antd/es/input/TextArea'
import PickJobPositionFormContainer from '../../containers/PickJobPositionForm/PickJobPositionForm.container'
import './JobfairRegistrationForm.styles.scss'

const JobfairRegistrationForm = ({ form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark="required"
      autoComplete="off"
      scrollToFirstError
      initialValues={{ description: undefined, jobPositions: [] }}
    >
      <Form.Item
        label="Registration description"
        required
        tooltip="This description will be shown during the jobfair"
        rules={CompanyProfileValidation.description}
        name="description"
      >
        <TextArea autoSize={{ minRows: 5 }} showCount maxLength={3000} placeholder="Registration description" />
      </Form.Item>
      <PickJobPositionFormContainer form={form} />
    </Form>
  )
}

export default JobfairRegistrationForm
