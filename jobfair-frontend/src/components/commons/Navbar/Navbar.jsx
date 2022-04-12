/* eslint-disable no-unused-vars */
import './Navbar.styles.scss';
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';

import {
  PATH,
  PATH_ADMIN,
  PATH_ATTENDANT,
  PATH_COMPANY_EMPLOYEE,
  PATH_COMPANY_MANAGER
} from '../../../constants/Paths/Path';
import { UserOutlined } from '@ant-design/icons';
import { logoutHandler } from '../../../redux-flow/authentication/authentication-action';
import { useDispatch, useSelector } from 'react-redux';

export const AttendantMenu = [
  <Menu.Item key={PATH_ATTENDANT.PROFILE_PAGE}>
    <Link to={PATH_ATTENDANT.PROFILE_PAGE}>Attendant Profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}>
    <Link to={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}>Job Fair List</Link>
  </Menu.Item>
];

export const CompanyManagerMenu = [
  <Menu.Item key={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE}>Company profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE}>Employee Management</Link>
  </Menu.Item>,
  <Menu.Item key={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}>
    <Link to={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}>Register to job fair</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.JOB_POSITION_MANAGEMENT_PAGE}>Job Position Management</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.APPLICATION_MANAGEMENT_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.APPLICATION_MANAGEMENT_PAGE}>Applications management</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE}>Organize job fair</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE}>
    <Link to={PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE}>My job fair</Link>
  </Menu.Item>
];

export const CompanyEmployeeMenu = [
  <Menu.Item key={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}>
    <Link to={PATH_COMPANY_EMPLOYEE.COMPANY_PROFILE_PAGE}>Company profile</Link>
  </Menu.Item>,
  <Menu.Item key={PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE}>
    <Link to={PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE}>Applications management</Link>
  </Menu.Item>
];

export const AdminMenu = [
  <Menu.Item key={PATH_ADMIN.JOB_FAIR_LIST_PAGE}>
    <Link to={PATH_ADMIN.JOB_FAIR_LIST_PAGE}>Job fair list</Link>
  </Menu.Item>
];

const NavigationBar = () => {
  const role = useSelector((state) => state.authentication?.user?.roles);
  const history = useHistory();
  const dispatch = useDispatch();
  const extraMenu = () => {
    switch (role) {
      case 'ATTENDANT':
        return AttendantMenu;
      case 'COMPANY_MANAGER':
        return CompanyManagerMenu;
      case 'COMPANY_EMPLOYEE':
        return CompanyEmployeeMenu;
      case 'ADMIN':
        return AdminMenu;
      default:
        return null;
    }
  };
  const handleClick = () => {
    dispatch(logoutHandler());
    history.push(PATH.INDEX);
  };

  const handleRedirect = (path) => history.push(path);
  return (
    <div className='navbar-container container-fluid'>
      <div className='Navbar'>
        <Link to={PATH.INDEX} className='logo'>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0, padding: '0 1.5rem', color: '#FFF' }}>
              Jobhub
            </Typography.Title>
          </div>
        </Link>
        <Menu className='menu' mode='horizontal'>
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
          {extraMenu() ? extraMenu().map((item) => item) : null}
          {/* {role ? <Button onClick={handleClick}>Logout</Button> : null} */}
        </Menu>
        {!role ? <AuthenticationButtonGroups handleRedirect={handleRedirect} /> : null}
        {role ? <AvatarMenu logoutFunction={handleClick} handleRedirect={handleRedirect} /> : null}
      </div>
    </div>
  );
};

const AuthenticationButtonGroups = ({ handleRedirect }) => (
  <div style={{ display: 'flex', position: 'absolute', right: 0 }}>
    <Button
      size='large'
      shape='round'
      onClick={() => handleRedirect(PATH.LOGIN_PAGE)}
      style={{ margin: '0 0.5rem', width: '7rem' }}>
      Login
    </Button>
    <Button
      size='large'
      shape='round'
      onClick={() => handleRedirect(PATH.REGISTER_PAGE)}
      style={{ margin: '0 0.5rem', width: '7rem' }}>
      Sign up
    </Button>
  </div>
);

const AvatarMenu = ({ logoutFunction }) => {
  const history = useHistory();
  const name = useSelector((state) => state.authentication.user.fullName);

  //TODO: remove later
  const getUsername = () => {
    switch (name) {
      case 'ADMIN':
        return 'Admin';
      case 'COMPANY_MANAGER':
        return 'Company manager';
      case 'COMPANY_EMPLOYEE':
        return 'Company employee';
      case 'ATTENDANT':
        return 'Attendant';
    }
  };
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === 'LOGOUT') logoutFunction();
        else if (e.key === 'CHANGE_PASSWORD_PAGE') history.push(PATH.CHANGE_PASSWORD_PAGE);
      }}
      style={{ zIndex: 10000000 }}>
      <Menu.Item key='CHANGE_PASSWORD_PAGE'>Change password</Menu.Item>
      <Menu.Item key='LOGOUT'>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ zIndex: 10000000, padding: '0 1rem', display: 'flex' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
        <Typography style={{ color: '#fff' }}>{name}</Typography>
      </div>
      <Dropdown overlay={menu} placement='bottomRight'>
        <Avatar size={45} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default NavigationBar;
