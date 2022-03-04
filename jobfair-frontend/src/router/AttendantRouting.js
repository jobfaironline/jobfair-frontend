import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AttendantProfile from '../pages/ProfilePage/Attendant/AttendantProfilePage'
import AttendantRouter from './components/AttendantRouter'
import AppliedJobPage from '../pages/AppliedJobPage/AppliedJobPage'
import { PATH_ATTENDANT } from '../constants/Paths/Path'
const AttendantRouting = () => {
  return (
    <>
      <AttendantRouter
        key={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}
        component={() => <AttendantProfile />}
        path={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}
        exact
      />
      <AttendantRouter
        key={PATH_ATTENDANT.APPLIED_JOB_PAGE}
        component={<AppliedJobPage />}
        path={PATH_ATTENDANT.APPLIED_JOB_PAGE}
        exact
      />
    </>
  )
}
export default AttendantRouting
