import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import JobfairRegistrationForm from '../../containers/JobfairRegistrationForm/JobfairRegistrationForm.container'
import { PATH } from '../../constants/Paths/Path'
import './FillBoothGeneralInformationPage.styles.scss'

const FillBoothGeneralInformationPage = () => {
  const dispatch = useDispatch()
  const { jobFairId } = useParams()
  const history = useHistory()

  return (
    <div className="page">
      <div className="jobfair-registration-page">
        <div className="jobfair-registration-cotnainer">
          <JobfairRegistrationForm jobFairId={jobFairId}/>
        </div>
      </div>
    </div>
  )
}

export default FillBoothGeneralInformationPage
