import './Footer.styles.scss';
import { Button, Input } from 'antd';
import { FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import React from 'react';

const { TextArea } = Input;

const Footer = () => (
  <div className='footer'>
    <div className='left-side'>
      <div className='logo'>
        <img style={{ width: '40%' }} src={`${window.location.origin}/logo/logo_with_text.svg`} />
      </div>
      <div>©2022 JobHub, Inc.</div>
      <div className='logo-click'>
        <div className='children'>
          <FacebookOutlined
            style={{ fontSize: '2rem' }}
            onClick={() => {
              window.location.href = 'https://www.facebook.com/jobhubapplication';
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
        <div className='title'>Have a question? Send us an email</div>
        <form action='mailto:tientt1938@gmail.com' method='post' encType='text/plain'>
          <TextArea
            style={{ marginTop: '0.5rem' }}
            type='text'
            name='comment'
            className={'input'}
            maxLength={500}
            autoSize={{ minRows: 3, maxRows: 3 }}
          />
          <br />
          <Button type='primary' htmlType='submit' style={{ marginTop: '0.5rem' }}>
            Send
          </Button>
        </form>
      </div>
    </div>
  </div>
);

export default Footer;
