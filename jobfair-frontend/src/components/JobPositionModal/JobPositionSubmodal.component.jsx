import React from 'react'
import { Space, Tag } from 'antd'
import { Modal, Button } from 'antd'
import { Form, Input, InputNumber } from 'antd'
import CreateJobPositionForm from '../create-job-position-form/CreateJobPositionForm'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}

const JobPositionSubmodal = ({ visible, handleOk, handleCancel, form, onFinish }) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const finalHandleOk = async () => {
    setConfirmLoading(true)
    await handleOk()
    setConfirmLoading(false)
  }

  return (
    <Modal
      width={800}
      title="Create job position"
      visible={visible}
      onOk={finalHandleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} form={form}>
        <CreateJobPositionForm form={form} />
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JobPositionSubmodal
