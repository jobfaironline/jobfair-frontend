import React from 'react'
import CompanyRegistrationDetailComponent from '../../components/CompanyRegistrationDetail/CompanyRegistrationDetail.component'
import { useHistory, useLocation } from 'react-router-dom'
import { evaluateJobFairRegistrationAPI } from '../../services/company-registration-controller/CompanyRegistrationControllerService'
import { notification } from 'antd'

const CompanyRegistrationDetailContainer = () => {
  const location = useLocation()
  const companyRegistration = location.state.companyRegistration
  const history = useHistory()

  const onFinish = values => {
    evaluateJobFairRegistrationAPI(values)
      .then(() => {
        notification['success']({
          message: `Submit evaluation successfully`,
          description: `Your evaluation has been submitted`,
          duration: 2
        })
        history.goBack()
      })
      .catch(() => {
        notification['error']({
          message: `Submit evaluation failed`,
          description: `There is problem while submitting, try again later`,
          duration: 2
        })
      })
  }

  return (
    <>
      <CompanyRegistrationDetailComponent data={companyRegistration} onFinish={onFinish} />
    </>
  )
}

export default CompanyRegistrationDetailContainer
