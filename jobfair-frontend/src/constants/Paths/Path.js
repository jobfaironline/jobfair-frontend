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
  FORGOT_PASSWORD_PAGE: '/accounts/forgot-password',
  CHANGE_PASSWORD_PAGE: '/accounts/change-password',
  RESET_PASSWORD_PAGE: '/accounts/reset-password',
  RESULT_SUCCESS_PAGE: '/proceed-success',
  RESULT_FAILED_PAGE: '/proceed-fail',
  FAQ_PAGE: '/faq',
  DECORATE_BOOTH_PAGE: '/decorate-booth/:companyBoothId/:jobFairId',
  USER_PAGE: '/user',
  CONTRACTS_PAGE: '/contacts',
  PUBLICIZED_JOB_FAIR_PAGE: '/job-fair',
  CHOOSE_BOOTH_PAGE: '/choose-booth/:jobFairId',
  CHOOSE_BOOTH_PATH: '/choose-booth/',
  DECORATE_BOOTH_PATH: '/decorate-booth/',
  HOME: '/home',
  EMPLOYEE_MANAGEMENT: '/employee-management',
  PROCESSED_FAIL: '/proceed-fail',
  PROCESSED_SUCCESS: '/',
  FINAL_ERROR_PAGE: '/error-500'
}
export const PATH_ADMIN = {
  JOB_FAIR_LIST_PAGE: '/admin/job-fair-list',
  APPROVAL_REGISTRATION_PAGE: '/approval-registration/:jobFairId',
  COMPANY_REGISTRATION_PAGE: '/approval-registration',
  JOB_FAIR_DETAIL_PAGE: '/job-fair-detail',
  JOB_FAIR_PLAN_LIST: '/job-fair-plan-list',
  COMPANY_REGISTRATION_DETAIL: '/company-registration-detail'
}
export const PATH_ATTENDANT = {
  ATTENDANT_PROFILE_PAGE: `/attendant/profile`,
  ATTENDANT_JOB_FAIR_PAGE: '/attendant/job-fair',
  APPLIED_JOB_PAGE: '/applied-job',
  JOB_FAIR_DETAIL: '/attendant/job-fair-detail',
  RESUME_DETAIL: '/attendant/resume-detail/:resumeId',
  RESUME_DETAIL_PAGE: '/attendant/resume-detail'
}
export const PATH_COMPANY_EMPLOYEE = {
  COMPANY_PROFILE_PAGE: '/employee/company-profile',
  COMPANY_EMPLOYEE_MANAGEMENT: '/company/employee-management',
  APPLIED_JOB_PAGE: '/applied-job',
  RESUME_DETAIL: '/resume-detail/:resumeId',
  RESUME_DETAIL_PAGE: '/employee/resume-detail'
}
export const PATH_COMPANY_MANAGER = {
  EMPLOYEE_MANAGEMENT_PAGE: '/company/employee-management',
  EMPLOYEE_REGISTER_PAGE: '/company/employee-register',
  REGISTER_JOB_FAIR_FORM: '/company/register-job-fair',
  COMPANY_PROFILE: '/manager/company-profile',
  JOB_POSITION_MANAGEMENT: '/company/job-position-management',
  JOB_POSITION_DETAIL: '/company/job-position-detail',
  CREATE_JOB_POSITION: '/company/create-job-position',
  JOB_FAIR_DETAIL: '/company/job-fair-detail',
  APPLIED_JOB_PAGE: '/company/applied-job',
  RESUME_DETAIL: '/resume-detail/:resumeId',
  RESUME_DETAIL_PAGE: '/manager/resume-detail'
}
export const PATH_STAFF = {
  JOB_FAIR_LIST_PAGE: '/staff/job-fair-list',
  APPROVAL_REGISTRATION_PAGE: '/approval-registration/:jobFairId',
  JOB_FAIR_DETAIL_PAGE: '/job-fair-detail'
}
