import {PageHeader} from 'antd'
import React from 'react'
import {useHistory} from 'react-router-dom'
import JobPositionDetailContainer from '../../containers/JobPositionDetail/JobPositionDetail.container'

const JobPositionDetailPage = props => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        style={{borderBottom: '1px solid grey', width: '100vw'}}
        className="site-page-header"
        onBack={() => history.push('/company/job-position-management')}
        title="Job position's details"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 0'
        }}
      >
        <JobPositionDetailContainer/>
      </div>
    </div>
  )
}

export default JobPositionDetailPage
