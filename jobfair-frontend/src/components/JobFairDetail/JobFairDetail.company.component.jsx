import React from 'react'
import { Card, Col, Empty, Row, Space, Spin, Typography } from 'antd'
import { convertToDateString } from '../../utils/common'

const { Text } = Typography

const JobFairDetailCompanyComponent = props => {
  const { data, role, handleDetailForCompany } = props
  if (data === undefined) {
    return <Spin />
  }
  if (data.length === 0) {
    return <Empty />
  }

  return (
    <>
      {data ? (
        <Card title="Job fair detail" bordered={true} headStyle={{ textAlign: 'center' }}>
          <Space direction="vertical">
            <Space size="middle" direction="vertical">
              <Row>
                <Col span={24}>
                  <Text strong>Job fair name: </Text>
                  <Text italic>{data?.name}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Description: </Text>
                  <Text italic>{data?.description}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Job fair time: </Text>
                  <Text italic>
                    {convertToDateString(data?.startTime)}
                    {' → '}
                    {convertToDateString(data?.endTime)}
                  </Text>
                </Col>
              </Row>
              {handleDetailForCompany(role, data)}
              <Row>
                <Col span={16}>
                  <Text strong>Target attendant: </Text>
                  <Text italic>{data?.targetAttendant}</Text>
                </Col>
              </Row>
            </Space>
          </Space>
        </Card>
      ) : null}
    </>
  )
}

export default JobFairDetailCompanyComponent
