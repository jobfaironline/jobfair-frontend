import { PATH, PATH_ADMIN, PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../constants/Paths/Path';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ResultSuccessPage } from '../pages/ResultSuccessPage/ResultSuccessPage';
import { selectWebSocket } from '../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import AboutApplicationPage from '../pages/AboutApplicationPage';
import ApplicationManagementPage from '../pages/ApplicationManagementPage/ApplicationManagementPage';
import AttendantAttemptTestPage from '../pages/AttendantAttemptTestPage/AttendantAttemptTestPage';
import AttendantJobFairPage from '../pages/AttendantJobFairPage/AttendantJobFairPage';
import AttendantProfile from '../pages/ProfilePage/Attendant/AttendantProfilePage';
import AttendantRouter from './components/AttendantRouter';
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage';
import CompanyEmployeeRouter from './components/CompanyEmployeeRouter';
import CompanyManagerRouter from './components/CompanyManagerRouter';
import CompanyProfilePage from '../pages/ProfilePage/Company/CompanyProfilePage';
import ContactPage from '../pages/ContactPage/ContactPage';
import DecorateBoothPage from '../pages/DecorateBoothPage/DecorateBoothPage';
import EmployeeAssignBoothMapPage from '../pages/EmployeeAssignBoothMapPage/EmployeeAssignBoothMapPage';
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import FAQPage from '../pages/FAQPage/FAQPage';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import InterviewSchedulePage from '../pages/InterviewSchedulePage/InterviewSchedulePage';
import JobFairAssignmentPage from '../pages/JobFairAssignmentPage/JobFairAssignmentPage';
import JobFairGridManagerPage from '../pages/JobFairListPage/JobFairGridManagerPage';
import JobFairListPage from '../pages/JobFairListPage/JobFairListPage';
import JobFairTablePage from '../pages/JobFairTablePage/JobFairTablePage';
import JobFairTemplateDetailPage from '../pages/JobFairTemplateDetailPage/JobFairTemplateDetailPage';
import JobFairTemplatePage from '../pages/JobFairTemplatePage/JobFairTemplatePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NavigationBar from '../components/commons/Navbar/Navbar';
import OrganizeJobFairPage from '../pages/OrganizeJobFairPage/OrganizeJobFairPage';
import PublicRouter from './components/PublicRouter';
import PublicizeJobFairDetailPage from '../pages/JobFairDetailPage/PublicizeJobFairDetailPage';
import PublicizedBoothPage from '../pages/PublicizedBoothPage/PublicizedBoothPage';
import QuestionBankPage from '../pages/QuestionBankPage/QuestionBankPage';
import React, { useEffect } from 'react';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import ResultFailedPage from '../pages/ResultFailedPage/ResultFailedPage';
import ResumeDetailPage from '../pages/ResumeDetailPage/ResumeDetailPage';

const AppRouter = () => {
  const webSocketClient = useSelector(selectWebSocket);
  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp);
    return () => {
      window.removeEventListener('beforeunload', cleanUp);
    };
  });

  //clean up action after page unload
  const cleanUp = () => {
    webSocketClient?.client.close();
  };

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
        <Route path={PATH.ABOUT_APPLICATION_PAGE} exact>
          <AboutApplicationPage />
        </Route>
        <Route path={PATH.PUBLICIZED_BOOTH_PAGE} exact>
          <PublicizedBoothPage />
        </Route>
        <Route path={PATH.BOOTH_PAGE} exact>
          <AttendantJobFairPage />
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
          key={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}
          component={() => <JobFairListPage />}
          path={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}
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
        <AttendantRouter
          key={PATH_ATTENDANT.ATTEMPT_TEST_PAGE}
          component={() => <AttendantAttemptTestPage />}
          path={PATH_ATTENDANT.ATTEMPT_TEST_PAGE}
          exact
        />
        <AttendantRouter
          key={PATH_ATTENDANT.INTERVIEW_SCHEDULE}
          component={() => <InterviewSchedulePage />}
          path={PATH_ATTENDANT.INTERVIEW_SCHEDULE}
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
          component={() => <CompanyProfilePage />}
          path={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE}
          component={() => <ResumeDetailPage />}
          path={PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.JOB_FAIR_DETAIL_PAGE}
          component={() => <PublicizeJobFairDetailPage />}
          path={PATH_COMPANY_EMPLOYEE.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE}
          component={() => <EmployeeAssignBoothMapPage />}
          path={PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE}
          component={() => <JobFairAssignmentPage />}
          path={PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE}
          component={() => <EmployeeAssignBoothMapPage />}
          path={PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE}
          exact
        />
        <CompanyEmployeeRouter
          key={PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE}
          component={() => <InterviewSchedulePage />}
          path={PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE}
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
          key={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}
          component={() => <CompanyProfilePage />}
          path={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE}
          component={() => <JobFairGridManagerPage />}
          path={PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE}
          component={() => <PublicizeJobFairDetailPage />}
          path={PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE}
          component={() => <OrganizeJobFairPage />}
          path={PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.TEMPLATE_GRID_PAGE}
          component={() => <JobFairTemplatePage />}
          path={PATH_COMPANY_MANAGER.TEMPLATE_GRID_PAGE}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.TEMPLATE_DETAIL}
          component={() => <JobFairTemplateDetailPage />}
          path={PATH_COMPANY_MANAGER.TEMPLATE_DETAIL}
          exact
        />
        <CompanyManagerRouter
          key={PATH_COMPANY_MANAGER.QUESTION_BANK}
          component={() => <QuestionBankPage />}
          path={PATH_COMPANY_MANAGER.QUESTION_BANK}
          exact
        />
        <Route path='/index.html'>
          <Redirect to='/' />
        </Route>
        <Route path='*' component={() => <ErrorPage code={404} />} />
      </Switch>
    </>
  );
};
export default AppRouter;
