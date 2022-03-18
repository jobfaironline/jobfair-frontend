import { PageHeader } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import JobPositionDetailContainer from '../../containers/JobPositionDetail/JobPositionDetail.container'
import {PATH_COMPANY_MANAGER} from "../../constants/Paths/Path";

const JobPositionDetailPage = props => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className="site-page-header"
        onBack={() => history.push(PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT)}
        title="Job position's details"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '4rem 0'
        }}
      >
        <JobPositionDetailContainer />
      </div>
    </div>
  )
}

export default JobPositionDetailPage
