import React from 'react'
import CompanyManagerRouter from './components/CompanyManagerRouter'
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage'
import EmployeeRegisterPage from '../pages/EmployeeRegisterPage/EmployeeRegisterPage'
import RegisterJobFairForm from '../components/register-job-fair-form/RegisterJobFairForm'
import { PATH_COMPANY_MANAGER } from '../constants/Paths/Path'
const CompanyManagerRouting = () => {
  return (
    <>
      <CompanyManagerRouter
        key="/company/employee-management"
        component={() => <EmployeeManagementPage />}
        path={PATH_COMPANY_MANAGER.EMPLOYEE_MANAGENT_PAGE}
        exact
      />
      <CompanyManagerRouter
        key="/company/employee-register"
        component={() => <EmployeeRegisterPage />}
        path={PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE}
        exact
      />
      <CompanyManagerRouter
        key="/company/register-job-fair"
        component={() => <RegisterJobFairForm />}
        path={PATH_COMPANY_MANAGER.REGISTER_JOB_FAIR_FORM}
        exact
      />
      <CompanyManagerRouter
        key="/company/profile"
        component={() => <CompanyProfile />}
        path={PATH_COMPANY_MANAGER.COMPANY_PROFILE}
        exact
      />
    </>
  )
}
export default CompanyManagerRouting
