import { FAQComponent } from '../../components/customized-components/FAQ/FAQ.components';
import { HomePageAdComponent } from '../../components/customized-components/HomePage/HomePageAd.component';
import { PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePageHeaderComponent from '../../components/customized-components/HomePage/HomePageHeader.component';
import React from 'react';
import RoleType from '../../constants/RoleType';

const HomePage = () => {
  const history = useHistory();
  const role = useSelector((state) => state?.authentication?.user?.roles);

  switch (role) {
    case RoleType.COMPANY_EMPLOYEE:
      history.push(PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE);
      return;
    case RoleType.COMPANY_MANAGER:
      history.push(PATH_COMPANY_MANAGER.COMPANY_PROFILE_PAGE);
      return;
  }

  return (
    <div className='page fullscreen-page non-sub-nav-bar'>
      <div>
        <HomePageHeaderComponent />
        <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }} />
        <HomePageAdComponent />
        <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }} />
        <div style={{ padding: '2% 10%' }}>
          <FAQComponent />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
