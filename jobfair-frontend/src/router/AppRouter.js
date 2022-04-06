import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AttendantRouter from './components/AttendantRouter'
import AttendantProfile from '../pages/ProfilePage/Attendant/AttendantProfilePage'
import CompanyManagerRouter from './components/CompanyManagerRouter'
import { ResultSuccessPage } from '../pages/ResultPage/ResultSuccessPage'
import { ChooseBoothPage } from '../pages/ChooseBoothPage/ChooseBoothPage'
import JobFairTablePage from '../pages/JobFairTablePage/JobFairTablePage'
import JobFairListPage from '../pages/JobFairListPage-remove/JobFairListPage'
import DecorateBoothPage from '../pages/DecorateBoothPage/DecorateBoothPage'
import FAQPage from '../pages/FAQPage/FAQPage'
import ResultFailedPage from '../pages/ResultPage/ResultFailedPage'
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PublicizedBoothPage from '../pages/PublicizedBoothPage/PublicizedBoothPage'
import HomePage from '../pages/HomePage'
import FillBoothGeneralInformationPage from '../pages/FillBoothGeneralInformationPage/FillBoothGeneralInformationPage'
import CompanyProfile from '../pages/ProfilePage/Company/CompanyProfilePage'
import EvaluateBoothInformationPage from '../pages/EvaluateBoothInformation/EvaluateBoothInformationPage'
import AttendantJobFairPage from '../pages/AttendantJobFairPage/AttendantJobFairPage'
import CompanyEmployeeRouter from './components/CompanyEmployeeRouter'
import AdminRouter from './components/AdminRouter'
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage'
import RegisterJobFairForm from '../components/RegisterJobFairForm/RegisterJobFairForm.component'
import JobPositionPage from '../pages/JobPositionPage/JobPositionPage'
import NavigationBar from '../components/Navbar/Navbar'
import JobPositionDetailPage from '../pages/JobPositionPage/JobPositionDetailPage'
import CreateJobPositionPage from '../pages/JobPositionPage/CreateJobPositionPage'
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage'
import EmployeeRegisterPage from '../pages/EmployeeRegisterPage/EmployeeRegisterPage'
import JobFairDetailPage from '../pages/JobFairDetailPage/JobFairDetailPage-remove'
import JobFairPlanPage from '../pages/JobFairPlanPage-remove/JobFairPlanPage'
import CompanyRegistrationDetailPage from '../pages/CompanyRegistrationDetailPage/CompanyRegistrationDetailPage'
import JobFairAttendantListPage from '../pages/JobFairAttendantListPage-remove/JobFairAttendantListPage'
import PublicRouter from './components/PublicRouter'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import {
  PATH,
  PATH_ADMIN,
  PATH_ATTENDANT,
  PATH_COMPANY_EMPLOYEE,
  PATH_COMPANY_MANAGER
} from '../constants/Paths/Path'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'
import PublicizeJobFairDetailPage from '../pages/JobFairDetailPage/PublicizeJobFairDetailPage'
import ResumeDetailPage from '../pages/ResumeDetailPage/ResumeDetailPage'
import ContactPage from '../pages/ContactPage/ContactPage'
import ApplicationManagementPage from '../pages/ApplicationManagementPage/ApplicationManagementPage'

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
        <Route path={PATH.PUBLICIZED_BOOTH_PAGE} exact>
          <PublicizedBoothPage />
        </Route>
        <Route path={PATH.BOOTH_PAGE} exact>
          <AttendantJobFairPage />
        </Route>
        <Route path={PATH.REGISTER_JOB_FAIR_PAGE} exact>
          <FillBoothGeneralInformationPage />
        </Route>
        <Route path={PATH.REGISTER_JOB_FAIR_PAGE} exact>
          <FillBoothGeneralInformationPage />
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
        <Route path={PATH.CONTRACTS_PAGE} exact>
          <ContactPage />
        </Route>
        <Route path={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE} exact>
          <JobFairListPage />
        </Route>
        <Route path={PATH_ADMIN.JOB_FAIR_LIST_PAGE} exact>
          <JobFairTablePage />
        </Route>
        <Route path={PATH.CHOOSE_BOOTH_PAGE} exact>
          <ChooseBoothPage />
        </Route>
        <Route path={PATH.RESULT_SUCCESS_PAGE} exact>
          <ResultSuccessPage />
        </Route>
        <PublicRouter
          key={PATH.LOGIN_PAGE}
          component={() => <LoginPage />}
          path={PATH.LOGIN_PAGE}
          exact
        />
        <PublicRouter
          key={PATH.REGISTER_PAGE}
          component={() => <RegisterPage />}
          path={PATH.REGISTER_PAGE}
          exact
        />
        <PublicRouter
          key={PATH.FORGOT_PASSWORD_PAGE}
          component={() => <ForgotPasswordPage />}
          path={PATH.FORGOT_PASSWORD_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.APPLICATION_MANAGEMENT_PAGE}
          component={() => <ApplicationManagementPage />}
          path={PATH_ATTENDANT.APPLICATION_MANAGEMENT_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.PROFILE_PAGE}
          component={() => <AttendantProfile />}
          path={PATH_ATTENDANT.PROFILE_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.JOB_FAIR_LIST_PAGE}
          component={() => <JobFairAttendantListPage />}
          path={PATH_ATTENDANT.JOB_FAIR_LIST_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.JOB_FAIR_DETAIL_PAGE}
          component={() => <PublicizeJobFairDetailPage />}
          path={PATH_ATTENDANT.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.RESUME_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_ATTENDANT.RESUME_DETAIL_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE}
          component={() => <ApplicationManagementPage />}
          path={PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
          component={() => <CompanyProfile />}
          path={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.RESUME_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_COMPANY_MANAGER.RESUME_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.APPLICATION_MANAGEMENT_PAGE}
          component={() => <ApplicationManagementPage />}
          path={PATH_COMPANY_MANAGER.APPLICATION_MANAGEMENT_PAGE}
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
          key={PATH_COMPANY_MANAGER.REGISTER_JOB_FAIR_FORM_PAGE}
          component={() => <RegisterJobFairForm />}
          path={PATH_COMPANY_MANAGER.REGISTER_JOB_FAIR_FORM_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}
          component={() => <CompanyProfile />}
          path={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT_PAGE}
          component={() => <JobPositionPage />}
          path={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL_PAGE}
          component={() => <JobPositionDetailPage />}
          path={PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.CREATE_JOB_POSITION_PAGE}
          component={() => <CreateJobPositionPage />}
          path={PATH_COMPANY_MANAGER.CREATE_JOB_POSITION_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE}
          component={() => <PublicizeJobFairDetailPage />}
          path={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.APPROVAL_REGISTRATION_PAGE}
          component={() => <EvaluateBoothInformationPage />}
          path={PATH_ADMIN.APPROVAL_REGISTRATION_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.JOB_FAIR_DETAIL_PAGE}
          component={() => <JobFairDetailPage />}
          path={PATH_ADMIN.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.JOB_FAIR_PLAN_LIST_PAGE}
          component={() => <JobFairPlanPage />}
          path={PATH_ADMIN.JOB_FAIR_PLAN_LIST_PAGE}
          exact
        />
        <AdminRouter
          key={PATH_ADMIN.COMPANY_REGISTRATION_DETAIL_PAGE}
          component={() => <CompanyRegistrationDetailPage />}
          path={PATH_ADMIN.COMPANY_REGISTRATION_DETAIL_PAGE}
          exact
        />
        <Route path="*" component={() => <ErrorPage code={404} />} />
      </Switch>
    </>
  )
}
export default AppRouter
