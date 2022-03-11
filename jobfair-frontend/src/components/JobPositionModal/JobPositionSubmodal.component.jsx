import React from 'react'
import {Col, Divider, Modal, Row, Space, Tag, Typography} from 'antd'
import {convertEnumToString} from '../../utils/common'
import './JobPositionSubmodal.styles.scss'

const {Title, Paragraph, Text} = Typography

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

const JobPositionSubmodal = ({visible, data, handleCancel}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  if (!data) {
    return null
  }

  return (
    <Modal
      wrapClassName="detail-modal"
      title="Create job position"
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <div style={{height: '100%'}}>
        <div key="no" style={{marginBottom: '0.8rem'}}>
          <Text strong style={{fontSize: '1.6rem'}}>{`Job position: ${data.title}`}</Text>
        </div>
        <div style={{marginLeft: '1rem'}}>
          <div className="sub-title" style={{marginBottom: '0.2rem'}}>
            <Text strong style={{fontSize: '1.4rem'}}>
              General information
            </Text>
          </div>
          <Col style={{marginLeft: '1rem'}}>
            <div key="language">
              <Space>
                <Text strong>Prefer language: </Text>
                <Text>{data.language}</Text>
              </Space>
            </div>
            <div key="skills">
              <Space>
                <Text strong>Required skills: </Text>
                {data.skillTagDTOS.map(skill => {
                  return (
                    <Tag color="blue" style={{fontSize: '0.9rem', padding: '0.1rem 0.3rem'}}>
                      {skill.name}
                    </Tag>
                  )
                })}
              </Space>
            </div>
            <div key="category">
              <Space>
                <Text strong>Category: </Text>
                {data.subCategoryDTOs.map(category => {
                  return (
                    <Tag color="blue" style={{fontSize: '0.9rem', padding: '0.1rem 0.3rem'}}>
                      {category.name}
                    </Tag>
                  )
                })}
              </Space>
            </div>
            <Row gutter={[100, 0]}>
              <Col span={8} key="level">
                <Space>
                  <Text strong>Job level: </Text>
                  <Text>{convertEnumToString(data.level)}</Text>
                </Space>
              </Col>
              <Col span={12} key="type">
                <Space>
                  <Text strong>Job type: </Text>
                  <Text>{convertEnumToString(data.jobType)}</Text>
                </Space>
              </Col>
            </Row>
            <Row gutter={[100, 0]}>
              <Col span={8}>
                <div key="contact-name">
                  <Space>
                    <Text strong>Contact:</Text>
                    <Text>{data.contactPersonName}</Text>
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div key="contact-email">
                  <Space>
                    <Text strong>Contact:</Text>
                    <Text>{data.contactEmail}</Text>
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
        </div>
        <div style={{marginLeft: '1rem'}}>
          <div className="sub-title" style={{marginBottom: '0.2rem'}}>
            <Text strong style={{fontSize: '1.4rem'}}>
              Specific jobfair's information
            </Text>
          </div>
          <div style={{marginLeft: '1rem'}}>
            <div key="description">
              <Space>
                <Text strong>Job description: </Text>
                <Text>{data.description}</Text>
              </Space>
            </div>
            <div key="requirement">
              <Space>
                <Text strong>Job requirement: </Text>
                <Text>{data.requirement}</Text>
              </Space>
            </div>
            <Row gutter={[100, 0]}>
              <Col span={8} key="salary-range">
                <Space>
                  <Text strong>Min salary: </Text>
                  <Text>{data.minSalary}</Text>
                  {data.maxSalary ? (
                    <>
                      <Text>~</Text>
                      <Text strong>Max salary: </Text>
                      <Text>{data.maxSalary}</Text>
                    </>
                  ) : null}
                </Space>
              </Col>
              <Col span={12} key="numOfPosition">
                <Space>
                  <Text strong>Available position:</Text>
                  <Text>{data.numberOfPosition} slot(s)</Text>
                </Space>
              </Col>
            </Row>
          </div>
        </div>

        <Divider/>
      </div>
    </Modal>
  )
}

export default JobPositionSubmodal
