import React from 'react'
import { Button, Form } from 'antd'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import TextArea from 'antd/es/input/TextArea'
import PickJobPositionFormContainer from '../../containers/PickJobPositionForm/PickJobPositionForm.container'

const JobfairRegistrationForm = ({ form, onPickJobFinish, nextStep, preStep }) => {
  return (
    <>
      <Form.Item
        label="Company registration description"
        required
        tooltip="This is required"
        rules={CompanyProfileValidation.description}
        name="description"
      >
        <TextArea showCount maxLength={3000} placeholder="Company registration description" style={{ width: 300 }} />
      </Form.Item>
      <PickJobPositionFormContainer form={form} onFinish={onPickJobFinish} />
      <Form.Item>
        <Button onClick={nextStep}>Next</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={preStep}>Prev</Button>
      </Form.Item>
    </>
  )
}

export default JobfairRegistrationForm
