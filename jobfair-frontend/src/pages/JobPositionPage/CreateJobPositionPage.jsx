import React from 'react'
import CreateJobPositionContainer from '../../containers/CreateJobPosition/CreateJobPosition.container'
import { PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'

const CreateJobPositionPage = () => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className="site-page-header"
        onBack={() => history.push('/company/job-position-management')}
        title="Job position's details"
      />
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}
      >
        <CreateJobPositionContainer />
      </div>
    </div>
  )
}

export default CreateJobPositionPage
