import React from 'react'
import {Button, Form} from 'antd'
import {CompanyProfileValidation} from '../../validate/CompanyProfileValidation'
import TextArea from 'antd/es/input/TextArea'
import PickJobPositionFormContainer from '../../containers/PickJobPositionForm/PickJobPositionForm.container'
import './JobfairRegistrationForm.styles.scss'

const JobfairRegistrationForm = ({form, onPickJobFinish, nextStep, preStep}) => {
  return (
    <div className="jobfair-registration-form-container">
      <Form.Item
        label="Registration description"
        required
        tooltip="This description will be shown during the jobfair"
        rules={CompanyProfileValidation.description}
        name="description"
      >
        <TextArea autoSize={{minRows: 5}} showCount maxLength={3000} placeholder="Registration description"/>
      </Form.Item>
      <PickJobPositionFormContainer form={form} onFinish={onPickJobFinish}/>
      <div className="step-buttons">
        <div className="next-step-button">
          <Form.Item>
            <Button size="large" type="primary" onClick={nextStep}>
              Next
            </Button>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default JobfairRegistrationForm
