import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {PageHeader} from 'antd'
import './ResumeDetailPage.styles.scss'
import ResumeDetailContainer from "../../containers/Resume/ResumeDetail.container";
import {useSelector} from "react-redux";

const ResumeDetailPage = () => {
  const history = useHistory()
  const location = useLocation()
  const {resumeId} = location.state

  return (
    <div className="page">
      <PageHeader className="site-page-header" onBack={() => history.goBack()} title="Resume Detail Page"/>
      <ResumeDetailContainer resumeId={resumeId} />
    </div>
  )
}
export default ResumeDetailPage
