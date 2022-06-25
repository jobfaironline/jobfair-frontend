import { Button, Layout, Modal, Typography } from 'antd';
import { default as CustomFooter } from '../components/commons/Footer/Footer';
import { Footer } from 'antd/es/layout/layout';
import { JobFairBoothReviewPage } from '../pages/JobFairBoothReviewPage/JobFairBoothReviewPage';
import { JobFairCheckListPage } from '../pages/JobFairCheckList/JobFairCheckListPage';
import { JobFairMapReviewPage } from '../pages/JobFairMapReviewPage/JobFairMapReviewPage';
import { PATH, PATH_ADMIN, PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../constants/Paths/Path';
import { Redirect, Route, Switch, matchPath, useLocation } from 'react-router-dom';
import { ResultSuccessPage } from '../pages/ResultSuccessPage/ResultSuccessPage';
import { feedbackAction } from '../redux-flow/feedback/feedback-slice';
import { selectWebSocket } from '../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import AboutApplicationPage from '../pages/AboutApplicationPage';
import ApplicationManagementPage from '../pages/ApplicationManagementPage/ApplicationManagementPage';
import AssignTaskPage from '../pages/AssignTaskPage/AssignTaskPage';
import AttendantAttemptTestPage from '../pages/AttendantAttemptTestPage/AttendantAttemptTestPage';
import AttendantJobFairPage from '../pages/AttendantJobFairPage/AttendantJobFairPage';
import AttendantProfile from '../pages/ProfilePage/Attendant/AttendantProfilePage';
import AttendantRouter from './components/AttendantRouter';
import BoothDescriptionPage from '../pages/BoothDescriptionPage/BoothDescriptionPage';
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
import HomePage from '../pages/HomePage/HomePage';
import InterviewLandingPage from '../pages/InterviewLandingPage/InterviewLandingPage';
import InterviewRoomPage from '../pages/InterviewRoomPage/InterviewRoomPage';
import InterviewSchedulePage from '../pages/InterviewSchedulePage/InterviewSchedulePage';
import JobFairAssignmentPage from '../pages/JobFairAssignmentPage/JobFairAssignmentPage';
import JobFairGridManagerPage from '../pages/JobFairListPage/JobFairGridManagerPage';
import JobFairLandingPage from '../pages/JobFairLandingPage/JobFairLandingPage';
import JobFairListPage from '../pages/JobFairListPage/JobFairListPage';
import JobFairTablePage from '../pages/JobFairTablePage/JobFairTablePage';
import JobFairTemplateDetailPage from '../pages/JobFairTemplateDetailPage/JobFairTemplateDetailPage';
import JobFairTemplatePage from '../pages/JobFairTemplatePage/JobFairTemplatePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import NavigationBar from '../components/commons/Navbar/Navbar';
import OrganizeJobFairPage from '../pages/OrganizeJobFairPage/OrganizeJobFairPage';
import PublicRouter from './components/PublicRouter';
import PublicizedBoothPage from '../pages/PublicizedBoothPage/PublicizedBoothPage';
import QuestionBankPage from '../pages/QuestionBankPage/QuestionBankPage';
import React, { useEffect, useState } from 'react';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import ResultFailedPage from '../pages/ResultFailedPage/ResultFailedPage';
import ResumeDetailPage from '../pages/ResumeDetailPage/ResumeDetailPage';
import ResumeManagmentPage from '../pages/ResumeManagementPage/ResumeManagementPage';

const excludeFooterPages = [PATH.BOOTH_PAGE, PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE];

const isHasFooter = (location) =>
  !excludeFooterPages.some((path) => {
    const match = matchPath(location.pathname, {
      path,
      exact: true,
      strict: true
    });
    return match?.isExact;
  });

function get_browser() {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) return { name: 'Opera', version: tem[1] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

  return {
    name: M[0],
    version: M[1]
  };
}

const UserAgentModal = () => {
  const browser = get_browser();
  const isDisable = browser.name !== 'Chrome' || (browser.name === 'Chrome' && browser.version < 102);
  useEffect(() => {
    isDisable &&
      Modal.info({
        title: 'Warning',
        width: '50rem',
        closable: true,
        maskClosable: true,
        content: `We current do not support ${browser.name} version ${browser.version}. Please use Chrome with version 102 or higher
`
      });
  }, []);
  return <></>;
};

const { Text, Title } = Typography;

const { REACT_APP_SURVEY_LINK } = process.env;

const FeedbackModal = () => {
  const hasFeedback = useSelector((state) => state?.feedback?.hasFeedback);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { isAuthUser } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (hasFeedback || !isAuthUser) return;
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000 * 60 * 2);
    return () => clearTimeout(timer);
  }, [isVisible, isAuthUser]);

  return (
    <Modal
      visible={isVisible}
      title={'Feedback'}
      okText={'Go to survey'}
      closable={true}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={() => {
        window.open(REACT_APP_SURVEY_LINK);
        setVisible(false);
        dispatch(feedbackAction.setFeedBack(true));
      }}>
      <Title level={4}>Thank you for your support</Title>
      <Text>We will be very appreciate if you could spend 2 minutes to do our survey. </Text>
      <br />
      <Text>It means a lot to us.</Text>
    </Modal>
  );
};

const AppRouter = () => {
  const location = useLocation();

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
    <div>
      <UserAgentModal />
      <FeedbackModal />
      <Button
        style={{ position: 'absolute', right: '100px', top: '180px', zIndex: '10000' }}
        type='primary'
        onClick={() => {
          Modal.info({
            width: '1000px',
            title: 'Hướng dẫn sử dụng',
            content: (
              <div style={{ overflow: 'hidden', paddingBottom: '56.25%', position: 'relative', height: 0 }}>
                <iframe
                  style={{ left: 0, top: 0, height: '100%', width: '100%', position: 'absolute' }}
                  width='853'
                  height='480'
                  src={`https://www.youtube.com/embed/79lQDBhVz_0`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title='Embedded youtube'
                />
              </div>
            )
          });
        }}>
        Hướng dẫn sử dụng
      </Button>
      <Layout style={{ minHeight: '100vh' }}>
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
          <Route path={PATH.JOB_FAIR_LANDING_PAGE} exact>
            <JobFairLandingPage />
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
            key={PATH_ATTENDANT.RESUME_DETAIL_PAGE}
            component={() => <ResumeDetailPage />}
            path={PATH_ATTENDANT.RESUME_DETAIL_PAGE}
            exact
          />
          <AttendantRouter
            key={PATH.INTERVIEW_LANDING_PAGE}
            component={() => <InterviewLandingPage />}
            path={PATH.INTERVIEW_LANDING_PAGE}
            exact
          />
          <AttendantRouter
            key={PATH_ATTENDANT.INTERVIEW_ROOM_PAGE}
            component={() => <InterviewRoomPage />}
            path={PATH_ATTENDANT.INTERVIEW_ROOM_PAGE}
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
          <AttendantRouter
            key={PATH_ATTENDANT.RESUME_MANAGEMENT_PAGE}
            component={() => <ResumeManagmentPage />}
            path={PATH_ATTENDANT.RESUME_MANAGEMENT_PAGE}
            exact
          />
          <AttendantRouter
            key={PATH_ATTENDANT.WAITING_ROOM_PAGE}
            component={() => <InterviewRoomPage />}
            path={PATH_ATTENDANT.WAITING_ROOM_PAGE}
            exact
          />
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE}
            component={() => <DecorateBoothPage />}
            path={PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE}
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
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.INTERVIEW_ROOM_PAGE}
            component={() => <InterviewRoomPage />}
            path={PATH_COMPANY_EMPLOYEE.INTERVIEW_ROOM_PAGE}
            exact
          />
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE}
            component={() => <AssignTaskPage />}
            path={PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE}
            exact
          />
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE}
            component={() => <BoothDescriptionPage />}
            path={PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE}
            exact
          />
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.CHECKLIST}
            component={() => <JobFairCheckListPage />}
            path={PATH_COMPANY_EMPLOYEE.CHECKLIST}
            exact
          />
          <CompanyEmployeeRouter
            key={PATH_COMPANY_EMPLOYEE.JOB_FAIR_BOOTH_REVIEW}
            component={() => <JobFairBoothReviewPage />}
            path={PATH_COMPANY_EMPLOYEE.JOB_FAIR_BOOTH_REVIEW}
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
          <CompanyManagerRouter
            key={PATH_COMPANY_MANAGER.CHECKLIST}
            component={() => <JobFairCheckListPage />}
            path={PATH_COMPANY_MANAGER.CHECKLIST}
            exact
          />
          <CompanyManagerRouter
            key={PATH_COMPANY_MANAGER.REVIEW_MAP}
            component={() => <JobFairMapReviewPage />}
            path={PATH_COMPANY_MANAGER.REVIEW_MAP}
            exact
          />
          <Route path='/index.html'>
            <Redirect to='/' />
          </Route>
          <Route path='*' component={() => <ErrorPage code={404} />} />
        </Switch>
        {isHasFooter(location) ? (
          <Footer>
            <CustomFooter />
          </Footer>
        ) : null}
      </Layout>
    </div>
  );
};
export default AppRouter;
