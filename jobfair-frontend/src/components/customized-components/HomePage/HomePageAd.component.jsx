import './HomePageAd.styles.scss';
import { Typography } from 'antd';
import React from 'react';

export const HomePageAdComponent = () => (
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
          <Typography.Title level={3} strong>
            Học sinh - Sinh viên có được việc làm
          </Typography.Title>
        </div>
      </div>
      <div className='text-and-circle'>
        <div className='responsive-circle'>
          <div className='circle-text'>500</div>
        </div>
        <div className='text'>
          <Typography.Title level={3} strong>
            Doanh nghiệp tuyển dụng tham gia
          </Typography.Title>
        </div>
      </div>
    </div>
  </div>
);
