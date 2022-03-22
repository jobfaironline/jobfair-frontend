import React from 'react'
import { Modal, Button } from 'antd'
import { Card, Col, Divider, Row, Space, Tag, Typography, Anchor, Spin } from 'antd'
import { convertEnumToString } from '../../utils/common'
import './JobPositionSubmodal.styles.scss'
import JobPositionSubmodalDetailComponent from "./JobPositionSubmodalDetail.component";
const { Title, Paragraph, Text } = Typography

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

const JobPositionSubmodal = ({ visible, data, handleCancel }) => {
  if (data === undefined) {
    return null
  }

  return (
    <Modal
      wrapClassName="detail-modal"
      title="Job position's details"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <JobPositionSubmodalDetailComponent data={data}/>
    </Modal>
  )
}

export default JobPositionSubmodal
