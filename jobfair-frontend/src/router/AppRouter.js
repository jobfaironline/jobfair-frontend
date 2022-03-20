import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AttendantRouter from './components/AttendantRouter'
import AttendantProfile from '../pages/ProfilePage/Attendant/AttendantProfilePage'
import CompanyManagerRouter from './components/CompanyManagerRouter'
import { ResultSuccessPage } from '../pages/ResultPage/ResultSuccessPage'
import { ChooseBoothPage } from '../pages/ChooseBoothPage/ChooseBoothPage'
import JobFairListPage from '../pages/JobFairListPage/JobFairList.page'
import JobFairsPage from '../pages/JobFairsPage/JobFairsPage'
import UserPage from '../pages/UserPage/UserPage'
import DecorateBoothPage from '../pages/DecorateBoothPage/DecorateBoothPage'
import FAQPage from '../pages/FAQPage/FAQPage'
import ResultFailedPage from '../pages/ResultPage/ResultFailedPage'
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import JobFairParkPage from '../pages/JobFairParkPage/JobFairParkPage'
import HomePage from '../pages/HomePage'
import JobfairRegistrationPage from '../pages/JobfairRegistrationPage/JobfairRegistrationPage'
import CompanyProfile from '../pages/ProfilePage/Company/CompanyProfilePage'
import ApprovalRegistrationPage from '../pages/ApprovalRegistrationPage/ApprovalRegistration.page'
import AttendantJobFairPage from '../pages/AttendantJobFairPage/AttendantJobFairPage'
import AppliedJobPage from '../pages/AppliedJobPage/AppliedJobPage'
import CompanyEmployeeRouter from './components/CompanyEmployeeRouter'
import AdminRouter from './components/AdminRouter'
import StaffRouter from './components/StaffRouter'
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage'
import RegisterJobFairForm from '../components/register-job-fair-form/RegisterJobFairForm'
import JobPositionPage from '../pages/JobPositionPage/JobPositionPage'
import NavigationBar from '../components/navbar/Navbar'
import JobPositionDetailPage from '../pages/JobPositionPage/JobPositionDetailPage'
import CreateJobPositionPage from '../pages/JobPositionPage/CreateJobPositionPage'
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage'
import EmployeeRegisterPage from '../pages/EmployeeRegisterPage/EmployeeRegisterPage'
import JobFairDetailPage from '../pages/JobFairDetailPage/JobFairDetailPage'
import JobFairPlanPage from '../pages/JobFairPlanPage/JobFairPlanPage'
import CompanyRegistrationDetailPage from '../pages/CompanyRegistrationDetailPage/CompanyRegistrationDetailPage'
import JobFairAttendantListPage from '../pages/JobFairAttendantListPage/JobFairAttendantListPage'
import PublicRouter from './components/PublicRouter'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import {
  PATH,
  PATH_ADMIN,
  PATH_ATTENDANT,
  PATH_COMPANY_EMPLOYEE,
  PATH_COMPANY_MANAGER,
  PATH_STAFF
} from '../constants/Paths/Path'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'
import JobFairDetailCompanyPage from "../pages/JobFairDetailPage/JobFairDetailCompanyPage";
import ResumeDetailPage from "../pages/ResumeDetailPage/ResumeDetailPage";
import ContactPage from "../pages/ContactPage/ContactPage";

const AppRouter = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path={PATH.FINAL_ERROR_PAGE} exact>
          <ErrorPage code={500} />
        </Route>
        <Route path={PATH.INDEX} exact>
          <HomePage />
        </Route>
        <Route path={PATH.JOB_FAIR_PARK_PAGE} exact>
          <JobFairParkPage />
        </Route>
        <Route path={PATH.ATTENDANT_JOB_FAIR_PAGE} exact>
          <AttendantJobFairPage />
        </Route>
        <Route path={PATH.JOB_FAIR_REGISTRATION_PAGE_ID} exact>
          <JobfairRegistrationPage />
        </Route>
        <Route path={PATH.JOB_FAIR_REGISTRATION_PAGE} exact>
          <JobfairRegistrationPage />
        </Route>
        <Route path={PATH.RESET_PASSWORD_PAGE} exact>
          <ResetPasswordPage />
        </Route>
        <Route path={PATH.CHANGE_PASSWORD_PAGE} exact>
          <ChangePasswordPage />
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
          <ContactPage />
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
        <PublicRouter key={PATH.LOGIN_PAGE} component={() => <LoginPage />} path={PATH.LOGIN_PAGE} exact />
        <PublicRouter key={PATH.REGISTER_PAGE} component={() => <RegisterPage />} path={PATH.REGISTER_PAGE} exact />
        <PublicRouter
          key={PATH.FORGOT_PASSWORD_PAGE}
          component={() => <ForgotPasswordPage />}
          path={PATH.FORGOT_PASSWORD_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.APPLIED_JOB_PAGE}
          component={() => <AppliedJobPage />}
          path={PATH_ATTENDANT.APPLIED_JOB_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}
          component={() => <AttendantProfile />}
          path={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.ATTENDANT_JOB_FAIR_PAGE}
          component={() => <JobFairAttendantListPage />}
          path={PATH_ATTENDANT.ATTENDANT_JOB_FAIR_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.JOB_FAIR_DETAIL}
          component={() => <JobFairDetailCompanyPage />}
          path={PATH_ATTENDANT.JOB_FAIR_DETAIL}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.CV_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_ATTENDANT.CV_DETAIL_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
          component={() => <CompanyProfile />}
          path={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.CV_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_COMPANY_EMPLOYEE.CV_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.CV_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_COMPANY_MANAGER.CV_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE}
          component={() => <EmployeeManagementPage />}
          path={PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE}
          component={() => <EmployeeRegisterPage />}
          path={PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.REGISTER_JOB_FAIR_FORM}
          component={() => <RegisterJobFairForm />}
          path={PATH_COMPANY_MANAGER.REGISTER_JOB_FAIR_FORM}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.COMPANY_PROFILE}
          component={() => <CompanyProfile />}
          path={PATH_COMPANY_MANAGER.COMPANY_PROFILE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT}
          component={() => <JobPositionPage />}
          path={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL}
          component={() => <JobPositionDetailPage />}
          path={PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.CREATE_JOB_POSITION}
          component={() => <CreateJobPositionPage />}
          path={PATH_COMPANY_MANAGER.CREATE_JOB_POSITION}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL}
          component={() => <JobFairDetailCompanyPage />}
          path={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.APPROVAL_REGISTRATION_PAGE}
          component={() => <ApprovalRegistrationPage />}
          path={PATH_ADMIN.APPROVAL_REGISTRATION_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.COMPANY_REGISTRATION_PAGE}
          component={() => <ApprovalRegistrationPage />}
          path={PATH_ADMIN.COMPANY_REGISTRATION_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.JOB_FAIR_DETAIL_PAGE}
          component={() => <JobFairDetailPage />}
          path={PATH_ADMIN.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.JOB_FAIR_PLAN_LIST}
          component={() => <JobFairPlanPage />}
          path={PATH_ADMIN.JOB_FAIR_PLAN_LIST}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.COMPANY_REGISTRATION_DETAIL}
          component={() => <CompanyRegistrationDetailPage />}
          path={PATH_ADMIN.COMPANY_REGISTRATION_DETAIL}
          exact
        />
        <StaffRouter
          key={PATH_STAFF.APPROVAL_REGISTRATION_PAGE}
          component={() => <ApprovalRegistrationPage />}
          path={PATH_STAFF.APPROVAL_REGISTRATION_PAGE}
          exact
        />
        <StaffRouter
          key={PATH_STAFF.JOB_FAIR_DETAIL_PAGE}
          component={() => <JobFairDetailPage />}
          path={PATH_STAFF.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <Route path="*" component={() => <ErrorPage code={404} />} />
      </Switch>
    </>
  )
}
export default AppRouter
