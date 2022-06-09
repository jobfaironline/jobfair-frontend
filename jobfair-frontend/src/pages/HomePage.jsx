import { ATTENDANT, COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../constants/RoleType';
import { Button, Divider, Typography } from 'antd';
import { PATH } from '../constants/Paths/Path';
import { useSelector } from 'react-redux';
import ContactPage from './ContactPage/ContactPage';
import FAQPage from './FAQPage/FAQPage';
import React from 'react';
import ReactPlayer from 'react-player';

const JobFairAds = () => (
  <div className='ads-container'>
    <div className='ads-container-left'>
      <div className='first-line'>More than</div>
      <div className='second-line'>10.000</div>
      <div className='third-line'>user sign up to this page.</div>
    </div>
    <div className='ads-container-right'>
      <div className='text-and-circle'>
        <div className='responsive-circle'>
          <div className='circle-text'>80%</div>
        </div>
        <div className='text'>
          <Typography.Text strong>Học sinh - Sinh viên có được việc làm</Typography.Text>
        </div>
      </div>
      <div className='text-and-circle'>
        <div className='responsive-circle'>
          <div className='circle-text'>80%</div>
        </div>
        <div className='text'>
          <Typography.Text strong>Học sinh - Sinh viên có được việc làm</Typography.Text>
        </div>
      </div>
    </div>
  </div>
);

const HeaderPart = ({ onClick }) => (
  <div className='home-body'>
    <div className='a-better-way'>
      <div>
        <div className='circular-icon'>
          <img src={`${window.location.origin}/icon/anya-1.png`} alt={'Anya-1'} />
        </div>
        <div className='circular-icon'>
          <img src={`${window.location.origin}/icon/anya-2.png`} alt={'Anya-2'} />
        </div>
        <div className='circular-icon'>
          <img src={`${window.location.origin}/icon/anya-3.png`} alt={'Anya-3'} />
        </div>
      </div>
      <div className='below-icon-text'>JobHub's Slogan</div>
      <div className='paragraph-below-text'>
        Making a world where kids don’t need to cry… that was the whole reason I became a spy in the first place
      </div>
      <div>
        <Button type='primary' className='button'>
          <a href={PATH.LOGIN_PAGE}>Dùng thử miễn phí</a>
        </Button>
      </div>
    </div>
    <div className='solution-margin'></div>
    <div className='video-loop'>
      <div className='player-wrapper'>
        <ReactPlayer className='react-player' url='https://youtu.be/DrsZjqJIiSk' width='100%' height='100%' />
      </div>
    </div>
  </div>
);

const FooterPart = () => (
  <div className='footer'>
    <ContactPage />
  </div>
);

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
          <div className='page'>
            <HeaderPart />
            <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }}></div>
            <JobFairAds />
            <Divider plain></Divider>
            <FAQPage />
            <Divider plain></Divider>
            <FooterPart />
          </div>
        );
    }
  };
  return <div className='page fullscreen-page non-sub-nav-bar'>{handleDisplayHomePage(role)}</div>;
};
export default HomePage;
