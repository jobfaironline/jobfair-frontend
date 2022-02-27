import React, { useState } from 'react'
import { Space, Tag } from 'antd'
import { Modal, Button } from 'antd'
import { Form, Input, InputNumber } from 'antd'
import JobPositionTable from '../../containers/JobPositionTable/JobPositionTable.container'
import { useForm } from 'antd/lib/form/Form'

const JobPositionModal = ({ visible, setFinalSelectedJob, handleOk, handleCancel, handleCreateOnClick }) => {
  //modal
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const finalHandleOk = async () => {
    setConfirmLoading(true)
    await handleOk()
    setConfirmLoading(false)
  }

  return (
    <>
      <Modal
        width={800}
        title="Choose job position"
        visible={visible}
        onOk={finalHandleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Space>
          <Button type="primary" onClick={() => handleCreateOnClick()}>
            Create job position
          </Button>
        </Space>
        <JobPositionTable setFinalSelectedJob={setFinalSelectedJob} />
      </Modal>
    </>
  )
}

export default JobPositionModal
