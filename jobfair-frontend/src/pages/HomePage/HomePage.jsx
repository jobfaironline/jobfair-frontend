import { FAQComponent } from '../../components/customized-components/FAQ/FAQ.components';
import { HomePageAdComponent } from '../../components/customized-components/HomePage/HomePageAd.component';
import HomePageHeaderComponent from '../../components/customized-components/HomePage/HomePageHeader.component';
import React from 'react';

const HomePage = () => (
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
export default HomePage;
