import { FacebookOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import React from 'react';

const ContactPage = () => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
    <div style={{ flex: 1 }}>
      <div style={{ textTransform: 'uppercase', fontSize: '30px', fontWeight: 'bold', color: '#1E3B9B' }}>JobHub</div>
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
    <div style={{ flex: 4 }}>form</div>
  </div>
);

export default ContactPage;
