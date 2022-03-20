import React from 'react'
import { Button, Card, Col, Divider, Row, Space, Tag, Typography, Descriptions, Badge } from 'antd'
import EvaluationFormComponent from '../EvaluationForm/EvaluationForm.component'
import { Link, useHistory } from 'react-router-dom'
import { JOB_FAIR_FOR_ADMIN_STATUS, JOB_FAIR_PLAN_STATUS } from '../../constants/JobFairConst'
import { convertEnumToString } from '../../utils/common'
import { orange } from '@mui/material/colors'

const { Text } = Typography

const JobFairDetailComponent = props => {
  const { data, onFinish, totalRegistration, totalBooth, totalApproval } = props

  const handleButton = status => {
    if (status === undefined) {
      return
    }
    switch (status) {
      case JOB_FAIR_PLAN_STATUS.PENDING:
        return (
          <>
            <EvaluationFormComponent onFinish={onFinish} id={data.id} name="jobFairId" />
          </>
        )
      case JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_REGISTER:
        return <Link to={`/approval-registration/${data.id}`}>View registrations</Link>
    }
  }

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
      <Descriptions title="Job fair detail" bordered size="small" style={{ textAlign: 'center' }}>
        <Descriptions.Item label="Job fair name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
        <Descriptions.Item label="Job fair time">
          <Tag color="orange">
            {data.startTime} {' -> '}
            {data.endTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Attendant register time">{data.attendantRegisterStartTime}</Descriptions.Item>
        <Descriptions.Item label="Company register time">
          <Tag color="orange">
            {data.companyRegisterStartTime}
            {' -> '} {data.companyRegisterEndTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Company buy booth time">
          <Tag color="green">
            {data.companyBuyBoothStartTime} {' -> '}
            {data.companyBuyBoothEndTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Estimated number of participants">{data.estimateParticipant}</Descriptions.Item>
        <Descriptions.Item label="Target company">{data.targetCompany}</Descriptions.Item>
        <Descriptions.Item label="Target attendant">{data.targetAttendant}</Descriptions.Item>
        <Descriptions.Item label="Total approval company registrations">{totalApproval}</Descriptions.Item>
        <Descriptions.Item label="Total company registrations">{totalRegistration}</Descriptions.Item>
        <Descriptions.Item label="Total booths">{totalBooth} slot(s)</Descriptions.Item>
        <Descriptions.Item label="Status"> {handleStatusTag(data.status)}</Descriptions.Item>
      </Descriptions>
      <Space>{handleButton(data.status)}</Space>
    </>
  )
}

export default JobFairDetailComponent
