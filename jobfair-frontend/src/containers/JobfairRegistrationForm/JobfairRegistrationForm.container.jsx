import { Form } from 'antd'
import React, { Fragment } from 'react'
import PickJobPositionFormContainer from '../PickJobPositionForm/PickJobPositionForm.container'

const JobfairRegistrationForm = () => {
  //please pass this form into component or USE REDUX TO STORE FORM HOOK
  const [form] = Form.useForm()

  return (
    <Fragment>
      {/* replace this with step component */}
      <PickJobPositionFormContainer />
    </Fragment>
  )
}

export default JobfairRegistrationForm
