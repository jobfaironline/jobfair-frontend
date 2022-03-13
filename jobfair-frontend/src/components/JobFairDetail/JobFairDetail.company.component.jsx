import React from 'react'
import { Card, Col, Row, Space, Tag, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { JOB_FAIR_PLAN_STATUS } from '../../constants/JobFairConst'
import { convertEnumToString, convertToDateString } from '../../utils/common'

const { Text } = Typography

const JobFairDetailCompanyComponent = props => {
  const { data } = props
  const handleStatusTag = status => {
    if (status === undefined) {
      return
    }
    switch (status) {
      case JOB_FAIR_PLAN_STATUS.PENDING:
        return <Tag color="blue">{convertEnumToString(status)}</Tag>
      case JOB_FAIR_PLAN_STATUS.APPROVE:
        return <Tag color="green">{convertEnumToString(status)}</Tag>
      case JOB_FAIR_PLAN_STATUS.DRAFT:
        return <Tag color="gold">{convertEnumToString(status)}</Tag>
      case JOB_FAIR_PLAN_STATUS.REJECT:
        ;<Card title="Job fair detail" bordered={true} headStyle={{ textAlign: 'center' }} style={{ width: 450 }}>
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
                  <Text strong>Status: </Text>
                  {handleStatusTag(data?.status)}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Job fair time: </Text>
                  <Text italic>
                    {convertToDateString(data?.startTime)} {'->'}
                    {convertToDateString(data?.endTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Company register time: </Text>
                  <Text italic>
                    {convertToDateString(data?.companyRegisterStartTime)} {'->'}
                    {convertToDateString(data?.companyRegisterEndTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Company buy booth time: </Text>
                  <Text italic>
                    {convertToDateString(data?.companyBuyBoothStartTime)} {'->'}
                    {convertToDateString(data?.companyBuyBoothEndTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Estimated number of participants: </Text>
                  <Text italic>{data?.estimateParticipant}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Target company: </Text>
                  <Text italic>{data?.targetCompany}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <Text strong>Target attendant: </Text>
                  <Text italic>{data?.targetAttendant}</Text>
                </Col>
              </Row>
            </Space>
          </Space>
        </Card>
        return <Tag color="red">{convertEnumToString(status)}</Tag>
      case JOB_FAIR_PLAN_STATUS.DELETED:
        return <Tag color="volcano">{convertEnumToString(status)}</Tag>
      default:
        return <Tag color="orange">{convertEnumToString(status)}</Tag>
    }
  }

  const history = useHistory()
  return (
    <>
      {data ? (
        <Card title="Job fair detail" bordered={true} headStyle={{ textAlign: 'center' }} style={{ width: 450 }}>
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
                  <Text strong>Status: </Text>
                  {handleStatusTag(data?.status)}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Job fair time: </Text>
                  <Text italic>
                    {convertToDateString(data?.startTime)}
                    {' -> '}
                    {convertToDateString(data?.endTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Company register time: </Text>
                  <Text italic>
                    {convertToDateString(data?.companyRegisterStartTime)}
                    {' -> '}
                    {convertToDateString(data?.companyRegisterEndTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Company buy booth time: </Text>
                  <Text italic>
                    {convertToDateString(data?.companyBuyBoothStartTime)}
                    {' -> '}
                    {convertToDateString(data?.companyBuyBoothEndTime)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text strong>Estimated number of participants: </Text>
                  <Text italic>{data?.estimateParticipant}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Target company: </Text>
                  <Text italic>{data?.targetCompany}</Text>
                </Col>
              </Row>
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
