import React from 'react'
import { Col, Row, Space, Typography } from 'antd'
import { ReadFilled } from '@ant-design/icons'
const EducationList = props => {
  const { data } = props
  const { Title, Text } = Typography
  return (
    <>
      <Row>
        <Col span={1}>
          <ReadFilled style={{ fontSize: '3rem' }} />
        </Col>
        <Col span={20}>
          <div>
            <Text type="secondary" style={{ fontWeight: 'bold' }}>
              {data?.edutTime}
            </Text>
            <Row>
              <Col span={5}>
                <Title level={4}>{data?.titleName}</Title>
              </Col>
              <Col span={4} style={{ marginTop: '2px' }}>
                <Text>{data?.subName}</Text>
              </Col>
            </Row>
            <Text type="secondary">{data?.description}</Text>
          </div>
        </Col>
      </Row>
    </>
  )
}
export default EducationList
