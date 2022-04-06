import React, { useEffect } from 'react'
import { Form, Modal } from 'antd'
import JobPositionDetailFormComponent from './JobPositionDetailForm.component'

//hihi đồ chó chết
const JobPositionDetailModalContainer = props => {
  const { visible, setModalVisible, jobPosition, onFinish } = props

  const [form] = Form.useForm()

  const init = () => {
    jobPosition['skillTagIds'] = jobPosition['skillTagDTOS']
    jobPosition['subCategoriesIds'] = jobPosition['subCategoryDTOs']?.map(item => item.id)
    form.setFieldsValue({ ...jobPosition })
  }

  const handleOk = () => {
    setModalVisible(false)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    init()
  }, [jobPosition])

  return (
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
  )
}

export default JobPositionDetailModalContainer
