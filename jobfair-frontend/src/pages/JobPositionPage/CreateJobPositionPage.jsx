import React from 'react'
import CreateJobPositionForm from '../../components/create-job-position-form/CreateJobPositionForm'
import CreateJobPositionContainer from '../../containers/CreateJobPosition/CreateJobPosition.container'
import { Button, PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'
import {PATH_COMPANY_MANAGER} from "../../constants/Paths/Path";

const CreateJobPositionPage = props => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className="site-page-header"
        onBack={() => history.push(PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT)}
        title="Create job position page"
      />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
        <CreateJobPositionContainer />
      </div>
    </div>
  )
}

export default CreateJobPositionPage
