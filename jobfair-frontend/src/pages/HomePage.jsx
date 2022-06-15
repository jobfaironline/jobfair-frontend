import { PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

const HomePage = () => {
  const history = useHistory();
  const role = useSelector((state) => state?.authentication?.user?.roles);

  switch (role) {
    case 'COMPANY_EMPLOYEE':
      history.push(PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE);
      return;
    case 'COMPANY_MANAGER':
      history.push(PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE);
      return;
  }

  return (
    <div className='page fullscreen-page non-sub-nav-bar'>
      <div className='home'>
        <h2>This is Home Page</h2>
      </div>
    </div>
  );
};
export default HomePage;
