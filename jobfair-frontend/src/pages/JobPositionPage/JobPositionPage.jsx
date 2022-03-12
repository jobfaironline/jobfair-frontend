import React from 'react'
import JobPositionManagementContainer from '../../components/JobPosition/JobPositionManagement/JobPositionManagement.container'

const JobPositionPage = props => {
  return (
    <div className="page">
      <div style={{ padding: '3rem 1rem' }}>
        <JobPositionManagementContainer />
      </div>
    </div>
  )
}

export default JobPositionPage
