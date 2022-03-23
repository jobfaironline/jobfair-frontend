import React from 'react'
import {Col, Row, Space, Typography} from 'antd'
import {ReadFilled} from '@ant-design/icons'

const EducationList = props => {
  const {data} = props
  const {Title, Text} = Typography
  return (
    <>
      <Row>
        <ReadFilled style={{fontSize: '4rem', marginRight: '2rem'}}/>
        <Col span={20}>
          <div>
            <Text type="secondary" style={{fontWeight: 'bold'}}>
              {data?.time}
            </Text>
            <Row>
              <Col span={6}>
                <Title level={4}>{data?.titleName}</Title>
              </Col>
              <Col span={6} style={{marginTop: '2px'}}>
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
