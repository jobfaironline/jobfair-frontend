import './FooterHomePage.styles.scss';
import { FacebookOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDollarToSlot, faCubes, faDesktop, faFaceLaugh, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SendQuestionFormComponent from '../../components/forms/SendQuestionForm/SendQuestionForm.component';

const FooterHomePage = ({ form, onFinish }) => (
  <div className='footer'>
    <div className='left-side'>
      <div className='logo'>JobHub</div>
      <div>©2022 JobHub, Inc.</div>
      <div className='logo-click'>
        <div className='children'>
          <FacebookOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://www.facebook.com/TrongKhanh.Kieu';
            }}
          />
          <span className='description'>Liên hệ qua Facebook</span>
        </div>
        <div className='children'>
          <InstagramOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://help.instagram.com/';
            }}
          />
          <span className='description'>Liên hệ qua Instagram</span>
        </div>
        <div className='children'>
          <GithubOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://github.com/jobfaironline';
            }}
          />
          <span className='description'>Liên hệ qua Git Hub</span>
        </div>
      </div>
    </div>
    <div className='right-side'>
      <div className='children'>
        <div className='title'>Sản phẩm</div>
        <div className='normal-text'>
          <FontAwesomeIcon icon={faDesktop} />
          <span className='span-text'>JobHub Desktop (Sắp có)</span>
        </div>
        <div className='normal-text'>
          <FontAwesomeIcon icon={faCircleDollarToSlot} />
          <span className='span-text'>Các gói trả phí</span>
        </div>
      </div>
      <div className='children'>
        <div className='title'>Giải pháp</div>
        <div className='normal-text'>
          <FontAwesomeIcon icon={faLightbulb} />
          <span className='span-text'>Giải pháp Job Fair online</span>
        </div>
        <div className='normal-text'>
          <FontAwesomeIcon icon={faCubes} />
          <span className='span-text'>Trải nghiệm mô hình Job Fair 3D</span>
        </div>
        <div className='normal-text'>
          <FontAwesomeIcon icon={faFaceLaugh} />
          <span className='span-text'>Rút ngắn quy trình tuyển dụng và phỏng vấn</span>
        </div>
      </div>
      <div className='children'>
        <div className='title'>JobHub</div>
        <div className='normal-text'>Về JobHub</div>
        <div className='normal-text'>Blogs</div>
      </div>
      <div className='form-contact'>
        <SendQuestionFormComponent form={form} onFinish={onFinish} />
      </div>
    </div>
  </div>
);

export default FooterHomePage;
