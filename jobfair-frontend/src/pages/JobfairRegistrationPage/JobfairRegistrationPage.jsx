import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import JobfairRegistrationForm from '../../containers/JobfairRegistrationForm/JobfairRegistrationForm.container'
import {
  resetForm,
  setFormJobFairRegistrationId
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { PATH } from '../../constants/Paths/Path'
import './JobfairRegistrationPage.styles.scss'

const JobfairRegistrationPage = () => {
  const dispatch = useDispatch()
  const { jobfairId } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (jobfairId) dispatch(setFormJobFairRegistrationId(jobfairId))
    else history.push(PATH.JOB_FAIRS_PAGE)
  }, [jobfairId])

  useEffect(() => () => {
    dispatch(resetForm())
  })

  return (
    <div className="page">
      <div className="jobfair-registration-page">
        <div className="jobfair-registration-cotnainer">
          <JobfairRegistrationForm />
        </div>
      </div>
    </div>
  )
}

export default JobfairRegistrationPage
