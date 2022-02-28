import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import JobfairRegistrationForm from '../../containers/JobfairRegistrationForm/JobfairRegistrationForm.container'
import {
  resetForm,
  setFormJobFairRegistrationId
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'

const JobfairRegistrationPage = () => {
  const dispatch = useDispatch()
  const { jobfairId } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (jobfairId) dispatch(setFormJobFairRegistrationId(jobfairId))
    else history.push('/jobfair-list')
  }, [jobfairId])

  useEffect(
    () => () => {
      dispatch(resetForm())
    },
    []
  )

  return (
    <Fragment>
      {/* form container */}
      <JobfairRegistrationForm />
    </Fragment>
  )
}

export default JobfairRegistrationPage
