import './Footer.styles.scss';
import React from 'react';

const Footer = () => (
  <div className='footer'>
    <div className='logo'>
      <img src={`${window.location.origin}/logo/logo_with_text.svg`} width='40%' />
      <div style={{ marginTop: '2px' }}>©2022 JobHub, Inc.</div>
    </div>
  </div>
);

export default Footer;
