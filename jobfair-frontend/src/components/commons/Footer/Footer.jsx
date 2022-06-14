import './Footer.styles.scss';
import { Button, Input } from 'antd';
import { FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import React from 'react';

const { TextArea } = Input;

const Footer = () => (
  <div className='footer'>
    <div className='left-side'>
      <div className='logo'>
        <img style={{ width: '50%' }} src={`${window.location.origin}/logo/logo_with_text.svg`} />
      </div>
      <div>©2022 JobHub, Inc.</div>
      <div className='logo-click'>
        <div className='children'>
          <FacebookOutlined
            style={{ fontSize: '2rem' }}
            onClick={() => {
              window.location.href = 'https://www.facebook.com/TrongKhanh.Kieu';
            }}
          />
          <span className='description'>Facebook</span>
        </div>
        <div className='children'>
          <GithubOutlined
            style={{ fontSize: '2rem' }}
            onClick={() => {
              window.location.href = 'https://github.com/jobfaironline';
            }}
          />
          <span className='description'>Git Hub</span>
        </div>
      </div>
    </div>
    <div className='right-side'>
      <div className='form-contact'>
        <div className='title'>Have a question? Send us now</div>
        <form action='mailto:tientt1938@gmail.com' method='post' encType='text/plain'>
          Contact name:
          <br />
          <Input type='text' name='contact' className={'input'} />
          <br />
          Content:
          <br />
          <TextArea type='text' name='comment' className={'input'} maxLength={500} />
          <br />
          <Button type='primary' htmlType='submit' style={{ marginTop: '1rem' }} className={'button'}>
            Send
          </Button>
        </form>
      </div>
    </div>
  </div>
);

export default Footer;
