import React from 'react'
import { Timeline, Typography, Col, Row } from 'antd'

const NodeListComponent = props => {
  const { listData } = props
  const { Title, Text } = Typography
  return (
    <>
      <Timeline>
        {listData.map(data => (
          <Timeline.Item>
            <div style={{ marginLeft: '1.5rem' }}>
              <Row>
                <Col span={4}>
                  <Title level={4}>{data?.titleName}</Title>
                </Col>
                <Col span={4} style={{ marginTop: '2px' }}>
                  <Text>{data?.subName}</Text>
                </Col>
              </Row>
              <Text type="secondary" style={{ fontWeight: 'bold' }}>
                {data?.time}
              </Text>
              <br />
              <Text type="secondary">{data?.description}</Text>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  )
}
export default NodeListComponent
