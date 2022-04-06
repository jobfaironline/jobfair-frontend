import React from 'react'
import { Modal } from 'antd'
import JobPositionDetailFormComponent from './JobPositionDetailForm.component'

const JobPositionDetailModalComponent = props => {
  const { visible, handleOk, handleCancel, form, onFinish } = props

  return (
    <>
      <Modal
        width={800}
        title="Job position detail"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <JobPositionDetailFormComponent form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}

export default JobPositionDetailModalComponent
