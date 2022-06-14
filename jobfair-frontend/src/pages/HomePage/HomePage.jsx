import { ATTENDANT, COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType';
import { FAQComponent } from '../../components/customized-components/FAQ/FAQ.components';
import { HomePageAdComponent } from '../../components/customized-components/HomePage/HomePageAd.component';
import { useSelector } from 'react-redux';
import Footer from '../../components/commons/Footer/Footer';
import HomePageHeaderComponent from '../../components/customized-components/HomePage/HomePageHeader.component';
import React from 'react';

const HomePage = () => {
  const role = useSelector((state) => state.authentication.user.roles);

  const handleDisplayHomePage = (role) => {
    switch (role) {
      case COMPANY_MANAGER:
      case COMPANY_EMPLOYEE:
      case ATTENDANT:
        return (
          <div className='home'>
            <h2>Home page</h2>
          </div>
        );
      default:
        return (
          <div>
            <HomePageHeaderComponent />
            <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }} />
            <HomePageAdComponent />
            <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }} />
            <div style={{ padding: '2% 10%' }}>
              <FAQComponent />
            </div>
            <Footer />
          </div>
        );
    }
  };
  return <div className='page fullscreen-page non-sub-nav-bar'>{handleDisplayHomePage(role)}</div>;
};
export default HomePage;
