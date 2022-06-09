import { FacebookOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import React from 'react';

const ContactPage = () => (
  <div className='page contact-page'>
    <div>
      <div className='left-side'>
        <div>JobHub</div>
        <div>
          <FacebookOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://www.facebook.com/TrongKhanh.Kieu';
            }}
          />
          <InstagramOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://help.instagram.com/';
            }}
          />
          <GithubOutlined
            style={{ fontSize: '3rem' }}
            onClick={() => {
              window.location.href = 'https://github.com/jobfaironline';
            }}
          />
        </div>
      </div>
      <div className='right-side'>form</div>
    </div>
  </div>
);

export default ContactPage;
