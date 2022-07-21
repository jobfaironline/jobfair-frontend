import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  PATH,
  PATH_ADMIN,
  PATH_ATTENDANT,
  PATH_COMPANY_EMPLOYEE,
  PATH_COMPANY_MANAGER
} from '../../../constants/Paths/Path';
import RoleType from '../../../constants/RoleType';

export const AttendantMenu = [
  {
    title: 'Job Fairs List',
    link: PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE
  },
  {
    title: 'My interview schedule',
    link: PATH_ATTENDANT.INTERVIEW_SCHEDULE
  },
  {
    title: 'My job application',
    link: PATH_ATTENDANT.APPLICATION_MANAGEMENT_PAGE
  },
  {
    title: 'Resume management',
    link: PATH_ATTENDANT.RESUME_MANAGEMENT_PAGE
  }
];

export const CompanyManagerMenu = [
  {
    title: 'Company profile',
    link: PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE
  },
  {
    title: 'Employee Management',
    link: PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE
  },
  {
    title: 'My company job fairs',
    link: PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE
  },
  {
    title: 'Job fair 3D layout',
    link: PATH_COMPANY_MANAGER.TEMPLATE_GRID_PAGE
  }
];

export const CompanyEmployeeMenu = [
  {
    title: 'My assignment',
    link: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE
  }
];

export const AdminMenu = [
  {
    title: 'Job fair list',
    link: PATH_ADMIN.JOB_FAIR_LIST_PAGE
  },
  {
    title: 'Account management',
    link: PATH_ADMIN.ACCOUNT_MANAGEMENT_PAGE
  }
];

const extraMenu = (role) => {
  switch (role) {
    case RoleType.ATTENDANT:
      return (
        <>
          {AttendantMenu.map((menuItem) => (
            <Menu.Item className='sub-navbar-item' key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </>
      );
    case RoleType.COMPANY_MANAGER:
      return (
        <>
          {CompanyManagerMenu.map((menuItem) => (
            <Menu.Item className='sub-navbar-item' key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </>
      );
    case RoleType.COMPANY_EMPLOYEE:
      return (
        <>
          {CompanyEmployeeMenu.map((menuItem) => (
            <Menu.Item className='sub-navbar-item' key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </>
      );
    case RoleType.ADMIN:
      return (
        <>
          {AdminMenu.map((menuItem) => (
            <Menu.Item className='sub-navbar-item' key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </>
      );
    default:
      return null;
  }
};

export default extraMenu;
