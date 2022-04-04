import React from 'react'
import CreateJobPositionForm from '../../components/CreateJobPositionForm/CreateJobPositionForm'
import CreateJobPositionContainer from '../../containers/CreateJobPosition/CreateJobPosition.container'
import { Button, PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'

const CreateJobPositionPage = props => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className="site-page-header"
        onBack={() => history.push('/company/job-position-management')}
        title="Job position's details"
      />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
        <CreateJobPositionContainer />
      </div>
    </div>
  )
}

export default CreateJobPositionPage
