import React from 'react'
import CompanyEmployeeRouter from './components/CompanyEmployeeRouter'
import CompanyProfile from '../pages/ProfilePage/Company/CompanyProfilePage'
import { PATH_COMPANY_EMPLOYEE } from '../constants/Paths/Path'
const CompanyEmployeeRouting = () => {
  return (
    <>
      <CompanyEmployeeRouter
        key="/company/profile"
        component={() => <CompanyProfile />}
        path={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}
        exact
      />
    </>
  )
}
export default CompanyEmployeeRouting
