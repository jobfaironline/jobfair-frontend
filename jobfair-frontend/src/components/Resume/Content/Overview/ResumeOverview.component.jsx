import React from 'react'
import { Typography, Space, Row, Col } from 'antd'
import { ProjectOutlined } from '@ant-design/icons'
const OverviewComponent = prop => {
  const { Title, Text, Link } = Typography
  const { data } = props
  return (
    <>
      <Space>
        <Row>
          <Col>
            {data.experience ? (
              <Row>
                <Col>
                  <ProjectOutlined />
                </Col>
                <Col>{data.experience}</Col>
              </Row>
            ) : null}
          </Col>
          <Col>
            {data.age ? (
              <Row>
                <Col>
                  <ProjectOutlined />
                </Col>
                <Col>{data.experience}</Col>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Space>
    </>
  )
}
export default OverviewComponent
