export const PATH = {
  INDEX: '/',
  //publicize booths
  PUBLICIZED_BOOTH_PAGE: '/booths/:jobFairId',
  //click to booth and join
  BOOTH_PAGE: '/booth/:companyBoothId',
  //registration to job fair page
  REGISTER_JOB_FAIR_PAGE: '/register-job-fair/:jobFairId',
  LOGIN_PAGE: '/auth/login',
  REGISTER_PAGE: '/auth/register',
  FORGOT_PASSWORD_PAGE: '/account/forgot-password',
  CHANGE_PASSWORD_PAGE: '/account/change-password',
  RESET_PASSWORD_PAGE: '/account/reset-password',
  RESULT_SUCCESS_PAGE: '/proceed-success',
  RESULT_FAILED_PAGE: '/proceed-fail',
  FAQ_PAGE: '/faq',
  //choose booth page
  CONTRACTS_PAGE: '/contacts',
  PUBLICIZED_JOB_FAIR_LIST_PAGE: '/job-fair-list',
  HOME_PAGE: '/home',
  FINAL_ERROR_PAGE: '/error-500',
  ABOUT_APPLICATION_PAGE: '/about-application',
  JOB_FAIR_LANDING_PAGE: `/landing-job-fair/:jobFairId`
};
export const PATH_ADMIN = {
  PROFILE_PAGE: `/profile`,
  JOB_FAIR_LIST_PAGE: '/admin/job-fair-list',
  APPROVAL_REGISTRATION_PAGE: '/admin/approval-registration/:jobFairId',
  JOB_FAIR_DETAIL_PAGE: '/admin/job-fair-detail',
  JOB_FAIR_PLAN_LIST_PAGE: '/admin/job-fair-plan-list',
  COMPANY_REGISTRATION_DETAIL_PAGE: '/admin/company-registration-detail',
  ACCOUNT_MANAGEMENT_PAGE: '/admin/account-management'
};
export const PATH_ATTENDANT = {
  PROFILE_PAGE: `/profile`,
  JOB_FAIR_LIST_PAGE: '/attendant/job-fair-list',
  APPLICATION_MANAGEMENT_PAGE: '/attendant/application-management',
  JOB_FAIR_DETAIL_PAGE: '/attendant/job-fair-detail',
  INTERVIEW_ROOM_PAGE: '/attendant/interview/:scheduleId/:roomId',
  WAITING_ROOM_PAGE: '/attendant/waiting-room/:scheduleId/:roomId',
  INTERVIEW_SCHEDULE: '/attendant/interview-schedule',
  RESUME_DETAIL_PAGE: '/attendant/resume-detail/:id',
  ATTEMPT_TEST_PAGE: '/attendant/attempt-test/:quizId',
  RESUME_MANAGEMENT_PAGE: '/attendant/resume-management',
  EDIT_RESUME_PAGE: '/attendant/resume-detail/:id/edit',
  ADD_RESUME_PAGE: '/attendant/add-resume'
};
export const PATH_COMPANY_EMPLOYEE = {
  PROFILE_PAGE: `/profile`,
  COMPANY_PROFILE_PAGE: '/employee/company-profile',
  APPLICATION_MANAGEMENT_PAGE: '/employee/application-management',
  RESUME_DETAIL_PAGE: '/employee/resume-detail/:id',
  JOB_FAIR_DETAIL_PAGE: '/employee/job-fair-detail',
  ASSIGN_BOOTH_MAP_PAGE: '/employee/assign-map/:assignmentId',
  JOB_FAIR_ASSIGNMENT_PAGE: '/employee/job-fair-assignment',
  INTERVIEW_SCHEDULE: '/employee/interview-schedule',
  //decorate booth
  DECORATE_BOOTH_PAGE: '/employee/decorate-booth/:jobFairId/:companyBoothId',
  ASSIGN_TASK_PAGE: '/employee/assign-task/:boothId',
  BOOTH_DESCRIPTION_PAGE: '/employee/booth-description/:assignmentId',
  INTERVIEW_ROOM_PAGE: '/employee/interview/:scheduleId/:roomId',
  CHECKLIST: '/employee/checklist/:jobFairId',
  JOB_FAIR_BOOTH_REVIEW: '/employee/review-booth/:boothId'
};
export const PATH_COMPANY_MANAGER = {
  PROFILE_PAGE: `/profile`,
  EMPLOYEE_MANAGEMENT_PAGE: '/company/employee-management',
  REGISTER_JOB_FAIR_FORM_PAGE: '/company/register-job-fair',
  COMPANY_PROFILE_PAGE: '/company/company-profile',
  JOB_FAIR_DETAIL_PAGE: '/company/job-fair-detail',
  APPLICATION_MANAGEMENT_PAGE: '/company/application-management',
  RESUME_DETAIL_PAGE: '/company/resume-detail/:id',
  ORGANIZE_JOB_FAIR_PAGE: '/company/organize-job-fair',
  JOB_FAIR_GRID_PAGE: '/company/my-job-fair',
  TEMPLATE_GRID_PAGE: '/company/my-template',
  TEMPLATE_DETAIL: '/company/my-template/:templateId',
  QUESTION_BANK: '/company/question-bank',
  CHECKLIST: '/company/checklist/:jobFairId',
  REVIEW_MAP: '/company/review-map/:layoutId',
  JOB_FAIR_DASH_BOARD: '/company/dashboard/jobfair/:jobFairId',
  BOOTH_DASH_BOARD: '/company/dashboard/booth/:boothId'
};
