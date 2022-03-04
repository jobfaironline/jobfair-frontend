import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavigationBar from '../components/navbar/Navbar'

import PublicRouting from './PublicRouting'
import AdminRouting from './AdminRouting'
import StaffRouting from './StaffRouting'
import AttendantRouting from './AttendantRouting'
import CompanyEmployeeRouting from './CompanyEmployeeRouting'
import CompanyManagerRouting from './CompanyManagerRouting'

const AppRouter = () => {
  const role = useSelector(state => state.authentication?.user?.roles)

  return (
    <>
      <NavigationBar />
      <Switch>
        //Public Pages
        <PublicRouting {...role} />
        //Admin Pages
        <AdminRouting />
        //Staff Pages
        <StaffRouting />
        //Attendant Pages
        <AttendantRouting />
        //Company Employee Pages
        <CompanyEmployeeRouting />
        //Company Manager Pages
        <CompanyManagerRouting />
      </Switch>
    </>
  )
}
export default AppRouter
