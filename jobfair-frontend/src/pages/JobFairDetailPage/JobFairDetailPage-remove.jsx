import React from 'react'
import { PageHeader } from 'antd'
import JobFairDetailContainer from '../../containers/JobFairDetail/JobFairDetail.container'
import { useHistory } from 'react-router-dom'

const JobFairDetailPage = () => {
  const history = useHistory()
  return (
    <div className="page" style={{ marginTop: 80 }}>
      <PageHeader className="site-page-header" onBack={() => history.goBack()} title="Job fair detail" subTitle="" />
      <JobFairDetailContainer />
    </div>
  )
}

export default JobFairDetailPage
