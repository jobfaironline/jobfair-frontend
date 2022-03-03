import React from 'react'
import { Button, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandler } from '../../redux-flow/authentication/authentication-action'

export const AttendantMenu = [
  <Menu.Item key="attendant-profile">
    <Link to="/attendant/profile">Attendant Profile</Link>
  </Menu.Item>,
  <Menu.Item key="map">
    <Link to="/map/83fcb7d3-6d88-45d9-ad86-9314de41743d">Map</Link>
  </Menu.Item>
]

export const CompanyManagerMenu = [
  <Menu.Item key="company-profile">
    <Link to="/manager/company-profile">Company profile</Link>
  </Menu.Item>,
  <Menu.Item key="employee-management">
    <Link to="/company/employee-management">Employee Management</Link>
  </Menu.Item>,
  <Menu.Item key="manager-register-jobfair">
    <Link to="/company-register-jobfair/">Register to job fair</Link>
  </Menu.Item>
]

export const CompanyEmployeeMenu = [
  <Menu.Item key="company-profile">
    <Link to="/employee/company-profile">Company profile</Link>
  </Menu.Item>,
  <Menu.Item key="manager-register-jobfair">
    <Link to="/company-register-jobfair/">Register to job fair</Link>
  </Menu.Item>
]

export const AdminMenu = [
  <Menu.Item key="job-fair-list-admin">
    <Link to="/job-fair">Job fair list</Link>
  </Menu.Item>
]

export const StaffMenu = [
  <Menu.Item key="job-fair-list-staff">
    <Link to="/job-fair">Job fair list</Link>
  </Menu.Item>
]

const NavigationBar = () => {
  const role = useSelector(state => state.authentication?.user?.roles)
  const history = useHistory()
  const dispatch = useDispatch()
  let extraMenu = () => {
    switch (role) {
      case 'ATTENDANT':
        return AttendantMenu
      case 'COMPANY_MANAGER':
        return CompanyManagerMenu
      case 'COMPANY_EMPLOYEE':
        return CompanyEmployeeMenu
      case 'ADMIN':
        return AdminMenu
      case 'STAFF':
        return StaffMenu
      default:
        return null
    }
  }
  const handleClick = () => {
    dispatch(logoutHandler())
  }
  return (
    <div className="container-fluid">
      <div className="Navbar">
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">
              <div className="logo">LOGO</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contracts">Contact</Link>
          </Menu.Item>
          <Menu.Item key="faq">
            <Link to="/faq">FAQ</Link>
          </Menu.Item>
          {!role ? (
            <Menu.Item key="login">
              <Link to="/auth/login">Log In</Link>
            </Menu.Item>
          ) : null}
          {!role ? (
            <Menu.Item key="reg">
              <Link to="/auth/register">Register</Link>
            </Menu.Item>
          ) : null}
          {role ? (
            <Menu.Item key="changepassword">
              <Link to="/accounts/changepassword">Change Password</Link>
            </Menu.Item>
          ) : null}
          {!role ? (
            <Menu.Item key="forgotpassword">
              <Link to="/accounts/forgot-password">Forgot Password</Link>
            </Menu.Item>
          ) : null}
          {extraMenu()
            ? extraMenu().map(item => {
                return item
              })
            : history.push('/auth/login')}
          {role ? <Button onClick={handleClick}>Logout</Button> : null}
        </Menu>
      </div>
    </div>
  )
}

export default NavigationBar
