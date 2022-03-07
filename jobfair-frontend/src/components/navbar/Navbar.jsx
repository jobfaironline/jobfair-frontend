import React from 'react'
import { Button, Dropdown, Menu, Typography, Avatar } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandler } from '../../redux-flow/authentication/authentication-action'
import { UserOutlined } from '@ant-design/icons'
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
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT}>
    <Link to={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT}>Job Position Management</Link>
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
    history.push(PATH.INDEX)
  }

  const handleRedirect = path => history.push(path)
  return (
    <div className="navbar-container container-fluid">
      <div className="Navbar">
        <Link to={PATH.INDEX} className="logo">
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0, padding: '0 1.5rem', color: '#FFF' }}>
              Jobhub
            </Typography.Title>
          </div>
        </Link>
        <Menu className="menu" mode="horizontal">
          <Menu.Item key={PATH.CONTRACTS_PAGE}>
            <Link to={PATH.CONTRACTS_PAGE}>Contact</Link>
          </Menu.Item>
          <Menu.Item key={PATH.FAQ_PAGE}>
            <Link to={PATH.FAQ_PAGE}>FAQ</Link>
          </Menu.Item>
          {/* {!role ? (
            <Menu.Item key={PATH.LOGIN_PAGE}>
              <Link to={PATH.LOGIN_PAGE}>Log In</Link>
            </Menu.Item>
          ) : null}
          {!role ? (
            <Menu.Item key={PATH.REGISTER_PAGE}>
              <Link to={PATH.REGISTER_PAGE}>Register</Link>
            </Menu.Item>
          ) : null} }*/}
          {extraMenu()
            ? extraMenu().map(item => {
                return item
              })
            : null}
          {/* {role ? <Button onClick={handleClick}>Logout</Button> : null} */}
        </Menu>
        {!role ? <AuthenticationButtonGroups handleRedirect={handleRedirect} /> : null}
        {role ? <AvatarMenu logoutFunction={handleClick} handleRedirect={handleRedirect} /> : null}
      </div>
    </div>
  )
}

const AuthenticationButtonGroups = ({ handleRedirect }) => {
  return (
    <div style={{ display: 'flex', position: 'absolute', right: 0 }}>
      <Button
        size="large"
        shape="round"
        onClick={() => handleRedirect(PATH.LOGIN_PAGE)}
        style={{ margin: '0 0.5rem', width: '7rem' }}
      >
        Login
      </Button>
      <Button
        size="large"
        shape="round"
        onClick={() => handleRedirect(PATH.REGISTER_PAGE)}
        style={{ margin: '0 0.5rem', width: '7rem' }}
      >
        Sign up
      </Button>
    </div>
  )
}

const AvatarMenu = ({ logoutFunction, handleRedirect }) => {
  const history = useHistory()
  const menu = (
    <Menu
      onClick={e => {
        if (e.key === 'LOGOUT') logoutFunction()
        else if (e.key === 'CHANGE_PASSWORD_PAGE') history.push(PATH.CHANGE_PASSWORD_PAGE)
      }}
      style={{ zIndex: 10000000 }}
    >
      <Menu.Item key="CHANGE_PASSWORD_PAGE">Change password</Menu.Item>
      <Menu.Item key="LOGOUT">Logout</Menu.Item>
    </Menu>
  )

  return (
    <div style={{ zIndex: 10000000, padding: '0 1rem' }}>
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}

export default NavigationBar
