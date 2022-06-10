import { ATTENDANT, COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType';
import { Form, Typography } from 'antd';
import { useSelector } from 'react-redux';
import FAQPage from '../FAQPage/FAQPage';
import FooterHomePage from './FooterHomePage';
import HeaderHomePage from './HeaderHomePage';
import React from 'react';

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

const HomePage = () => {
  const role = useSelector((state) => state.authentication.user.roles);

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
  };

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
            <HeaderHomePage />
            <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }}></div>
            <JobFairAds />
            <div style={{ width: '100%', height: '10rem', backgroundColor: '#E5EAFB' }}></div>
            <FAQPage />
            <FooterHomePage form={form} onFinish={handleSubmit} />
          </div>
        );
    }
  };
  return <div className='page fullscreen-page non-sub-nav-bar'>{handleDisplayHomePage(role)}</div>;
};
export default HomePage;
