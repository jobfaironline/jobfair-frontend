import React, { useEffect, useState } from 'react'
import JobFairDetailComponent from '../../components/JobFairDetail/JobFairDetail.company.component'
import { getJobFairPlanById } from '../../services/job-fair-controller/JobFairConTrollerService'
import { Col, notification, Row, Typography } from 'antd'
import { COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType'
import { convertToDateString } from '../../utils/common'

const { Text } = Typography
const JobFairDetailCompanyContainer = props => {
  const { id, role } = props
  const [jobFairDetailData, setJobFairDetailData] = useState()
  const getJobFairDetail = async () => {
    getJobFairPlanById(id)
      .then(res => {
        setJobFairDetailData(res.data)
      })
      .catch(err => {
        if (err.response.status === 404) {
          notification['info']({
            message: `No booth has been assigned for this job fair yet.`
          })
        } else {
          notification['error']({
            message: `Error at get total booth: ${err}`
          })
        }
      })
  }
  useEffect(() => {
    getJobFairDetail()
  }, [])

  const handleDetailForCompany = (role, data) => {
    switch (role) {
      case COMPANY_MANAGER:
      case COMPANY_EMPLOYEE:
        return (
          <>
            <Row>
              <Col span={24}>
                <Text strong>Company register time: </Text>
                <Text italic>
                  {convertToDateString(data?.companyRegisterStartTime)}
                  {' → '}
                  {convertToDateString(data?.companyRegisterEndTime)}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text strong>Company buy booth time: </Text>
                <Text italic>
                  {convertToDateString(data?.companyBuyBoothStartTime)}
                  {' → '}
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
          </>
        )
      default:
        return null
    }
  }
  return (
    <>
      <JobFairDetailComponent data={jobFairDetailData} role={role} handleDetailForCompany={handleDetailForCompany} />
    </>
  )
}
export default JobFairDetailCompanyContainer
