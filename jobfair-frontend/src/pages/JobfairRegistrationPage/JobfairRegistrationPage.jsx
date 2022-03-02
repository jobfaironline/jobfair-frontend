import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import JobfairRegistrationForm from '../../containers/JobfairRegistrationForm/JobfairRegistrationForm.container'
import {
  resetForm,
  setFormJobFairRegistrationId
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import {getCompanyProfileAPI} from "../../services/companyService";
import {notification} from "antd";

const JobfairRegistrationPage = () => {
    const dispatch = useDispatch()
    const {jobfairId} = useParams()
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
            <JobfairRegistrationForm/>
        </Fragment>
    )
}

export default JobfairRegistrationPage
