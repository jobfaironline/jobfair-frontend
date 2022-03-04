import React from 'react'
import CompanyManagerRouter from './components/CompanyManagerRouter'
import EmployeeManagementPage from '../pages/EmployeeManagementPage/EmployeeManagementPage'
import EmployeeRegisterPage from '../pages/EmployeeRegisterPage/EmployeeRegisterPage'
import RegisterJobFairForm from '../components/register-job-fair-form/RegisterJobFairForm'
const CompanyManagerRouting = () => {
  return (
    <>
      <CompanyManagerRouter
        key="/company/employee-management"
        component={() => <EmployeeManagementPage />}
        path="/company/employee-management"
        exact
      />
      <CompanyManagerRouter
        key="/company/employee-register"
        component={() => <EmployeeRegisterPage />}
        path="/company/employee-register"
        exact
      />
      <CompanyManagerRouter
        key="/company/register-job-fair"
        component={() => <RegisterJobFairForm />}
        path="/company/register-job-fair"
        exact
      />
      <CompanyManagerRouter
        key="/company/profile"
        component={() => <CompanyProfile />}
        path="/manager/company-profile"
        exact
      />
    </>
  )
}
export default CompanyManagerRouting
