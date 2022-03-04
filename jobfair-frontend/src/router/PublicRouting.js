import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import JobFairParkPage from '../pages/JobFairParkPage/JobFairParkPage'
import AttendantJobFairPage from '../pages/AttendantJobFairPage/AttendantJobFairPage'
import JobfairRegistrationPage from '../pages/JobfairRegistrationPage/JobfairRegistrationPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'
import FAQPage from '../pages/FAQPage/FAQPage'
import UserPage from '../pages/UserPage/UserPage'
import ContractsPage from '../pages/ContractsPage/ContractsPage'
import JobFairsPage from '../pages/JobFairsPage/JobFairsPage'
import JobFairListPage from '../pages/JobFairListPage/JobFairList.page'
import { ChooseBoothPage } from '../pages/ChooseBoothPage/ChooseBoothPage'
import { ResultSuccessPage } from '../pages/ResultPage/ResultSuccessPage'
import DecorateBoothPage from '../pages/DecorateBoothPage/DecorateBoothPage'
import ResultFailedPage from '../pages/ResultPage/ResultFailedPage'
import { PATH } from '../constants/Paths/Path'
const PublicRouting = prop => {
  const { role } = prop
  return (
    <>
      {/*init home page*/}
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path={PATH.JOB_FAIR_PARK_PAGE} exact>
        <JobFairParkPage />
      </Route>
      <Route path={PATH.ATTENDANT_JOB_FAIR_PAGE} exact>
        <AttendantJobFairPage />
      </Route>

      {/* TODO: refactor later*/}
      <Route path={PATH.JOB_FAIR_REGISTRATION_PAGE_ID} exact>
        <JobfairRegistrationPage />
      </Route>
      <Route path={PATH.JOB_FAIR_REGISTRATION_PAGE} exact>
        <JobfairRegistrationPage />
      </Route>
      <Route path={PATH.LOGIN_PAGE} exact>
        {/*if user has already login, avoid them to login again*/}
        {!role ? <LoginPage /> : <Redirect to="/" />}
      </Route>
      <Route path={PATH.REGISTER_PAGE} exact>
        {!role ? <RegisterPage /> : <Redirect to="/" />}
      </Route>
      <Route path={PATH.CHANGE_PASSWORD_PAGE} exact>
        {role ? <ChangePasswordPage /> : <Redirect to="/auth/login" />}
      </Route>
      <Route path={PATH.RESULT_SUCCESS_PAGE} exact>
        <ResultSuccessPage />
      </Route>
      <Route path={PATH.RESULT_FAILED_PAGE} exact>
        <ResultFailedPage />
      </Route>

      <Route path={PATH.FAQ_PAGE} exact>
        <FAQPage />
      </Route>
      <Route path={PATH.DECORATE_BOOTH_PAGE} exact>
        <DecorateBoothPage />
      </Route>
      <Route path={PATH.USER_PAGE} exact>
        <UserPage />
      </Route>
      <Route path={PATH.CONTRACTS_PAGE} exact>
        <ContractsPage />
      </Route>
      <Route path={PATH.JOB_FAIRS_PAGE} exact>
        <JobFairsPage />
      </Route>
      <Route path={PATH.JOB_FAIR_LIST_PAGE} exact>
        <JobFairListPage />
      </Route>
      <Route path={PATH.CHOOSE_BOOTH_PAGE} exact>
        <ChooseBoothPage />
      </Route>
      <Route path={PATH.RESULT_SUCCESS_PAGE} exact>
        <ResultSuccessPage />
      </Route>
    </>
  )
}
export default PublicRouting
