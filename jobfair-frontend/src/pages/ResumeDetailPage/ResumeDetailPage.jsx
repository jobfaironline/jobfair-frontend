import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { PageHeader } from 'antd'
import './ResumeDetailPage.styles.scss'
import ResumeDetailForCompanyContainer from '../../containers/Resume/ResumeDetailForCompany.container'

const ResumeDetailPage = () => {
  const history = useHistory()
  const location = useLocation()
  const { resumeId } = location.state

  return (
    <div className="page">
      <PageHeader className="site-page-header" onBack={() => history.goBack()} title="Resume Detail Page" />
      <ResumeDetailForCompanyContainer resumeId={resumeId} />
    </div>
  )
}
export default ResumeDetailPage
