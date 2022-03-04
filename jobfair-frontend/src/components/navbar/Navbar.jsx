import React from 'react'
import { Button, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandler } from '../../redux-flow/authentication/authentication-action'
import './Navbar.styles.scss'

import {
  PATH,
  PATH_ADMIN,
  PATH_COMPANY_EMPLOYEE,
  PATH_COMPANY_MANAGER,
  PATH_ATTENDANT,
  PATH_STAFF
} from '../../constants/Paths/Path'
export const AttendantMenu = [
  <Menu.Item key={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}>
    <Link to={PATH_ATTENDANT.ATTENDANT_PROFILE_PAGE}>Attendant Profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH.MAP}>
    <Link to="/map/83fcb7d3-6d88-45d9-ad86-9314de41743d">Map</Link>
  </Menu.Item>
]

export const CompanyManagerMenu = [
  <Menu.Item key={PATH_COMPANY_MANAGER.COMPANY_PROFILE}>
    <Link to={PATH_COMPANY_MANAGER.COMPANY_PROFILE}>Company profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_EMPLOYEE.COMPANY_EMPLOYEE_MANAGEMENT}>
    <Link to={PATH_COMPANY_EMPLOYEE.COMPANY_EMPLOYEE_MANAGEMENT}>Employee Management</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.MANAGER_REGISTER_JOBFAIR}>
    <Link to={PATH_COMPANY_MANAGER.MANAGER_REGISTER_JOBFAIR}>Register to job fair</Link>
  </Menu.Item>
]

export const CompanyEmployeeMenu = [
  <Menu.Item key={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}>
    <Link to={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}>Company profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.MANAGER_REGISTER_JOBFAIR}>
    <Link to={PATH_COMPANY_MANAGER.MANAGER_REGISTER_JOBFAIR}>Register to job fair</Link>
  </Menu.Item>
]

export const AdminMenu = [
  <Menu.Item key={PATH.JOB_FAIR_LIST_PAGE}>
    <Link to={PATH.JOB_FAIR_LIST_PAGE}>Job fair list</Link>
  </Menu.Item>
]

export const StaffMenu = [
  <Menu.Item key={PATH.JOB_FAIR_LIST_PAGE}>
    <Link to={PATH.JOB_FAIR_LIST_PAGE}>Job fair list</Link>
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
          <Menu.Item key={PATH.INDEX}>
            <Link to={PATH.INDEX}>
              <div className="logo">LOGO</div>
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.CONTRACTS_PAGE}>
            <Link to={PATH.CONTRACTS_PAGE}>Contact</Link>
          </Menu.Item>
          <Menu.Item key={PATH.FAQ_PAGE}>
            <Link to={PATH.FAQ_PAGE}>FAQ</Link>
          </Menu.Item>
          {!role ? (
            <Menu.Item key={PATH.LOGIN_PAGE}>
              <Link to={PATH.LOGIN_PAGE}>Log In</Link>
            </Menu.Item>
          ) : null}
          {!role ? (
            <Menu.Item key={PATH.REGISTER_PAGE}>
              <Link to={PATH.REGISTER_PAGE}>Register</Link>
            </Menu.Item>
          ) : null}
          {role ? (
            <Menu.Item key={PATH.CHANGE_PASSWORD_PAGE}>
              <Link to={PATH.CHANGE_PASSWORD_PAGE}>Change Password</Link>
            </Menu.Item>
          ) : null}
          {extraMenu()
            ? extraMenu().map(item => {
                return item
              })
            : history.push(PATH.LOGIN_PAGE)}
          {role ? <Button onClick={handleClick}>Logout</Button> : null}
        </Menu>
      </div>
    </div>
  )
}

export default NavigationBar
