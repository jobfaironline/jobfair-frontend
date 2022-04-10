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
  //decorate booth
  DECORATE_BOOTH_PAGE: '/decorate-booth/:jobFairId/:companyBoothId',
  //choose booth page
  CHOOSE_BOOTH_PAGE: '/choose-booth/:jobFairId',
  CONTRACTS_PAGE: '/contacts',
  PUBLICIZED_JOB_FAIR_LIST_PAGE: '/job-fair-list',
  HOME_PAGE: '/home',
  FINAL_ERROR_PAGE: '/error-500',
  ABOUT_APPLICATION_PAGE: '/about-application',
};
export const PATH_ADMIN = {
  JOB_FAIR_LIST_PAGE: '/admin/job-fair-list',
  APPROVAL_REGISTRATION_PAGE: '/admin/approval-registration/:jobFairId',
  JOB_FAIR_DETAIL_PAGE: '/admin/job-fair-detail',
  JOB_FAIR_PLAN_LIST_PAGE: '/admin/job-fair-plan-list',
  COMPANY_REGISTRATION_DETAIL_PAGE: '/admin/company-registration-detail'
};
export const PATH_ATTENDANT = {
  PROFILE_PAGE: `/attendant/profile`,
  JOB_FAIR_LIST_PAGE: '/attendant/job-fair-list',
  APPLICATION_MANAGEMENT_PAGE: '/attendant/application-management',
  JOB_FAIR_DETAIL_PAGE: '/attendant/job-fair-detail',
  RESUME_DETAIL_PAGE: '/attendant/resume-detail'
};
export const PATH_COMPANY_EMPLOYEE = {
  COMPANY_PROFILE_PAGE: '/employee/company-profile',
  APPLICATION_MANAGEMENT_PAGE: '/employee/application-management',
  RESUME_DETAIL_PAGE: '/employee/resume-detail',
  JOB_FAIR_DETAIL_PAGE: '/employee/job-fair-detail'
};
export const PATH_COMPANY_MANAGER = {
  EMPLOYEE_MANAGEMENT_PAGE: '/company/employee-management',
  EMPLOYEE_REGISTER_PAGE: '/company/employee-register',
  REGISTER_JOB_FAIR_FORM_PAGE: '/company/register-job-fair',
  COMPANY_PROFILE_PAGE: '/company/company-profile',
  JOB_POSITION_MANAGEMENT_PAGE: '/company/job-position-management',
  JOB_POSITION_DETAIL_PAGE: '/company/job-position-detail',
  CREATE_JOB_POSITION_PAGE: '/company/create-job-position',
  JOB_FAIR_DETAIL_PAGE: '/company/job-fair-detail',
  APPLICATION_MANAGEMENT_PAGE: '/company/application-management',
  RESUME_DETAIL_PAGE: '/company/resume-detail'
};
