import './HomePageHeader.styles.scss';
import { Button } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import React from 'react';
import ReactPlayer from 'react-player';

const HomePageHeaderComponent = () => (
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
      <div className='below-icon-text'>A virtual job fair platform</div>
      <div className='paragraph-below-text'>
        Surrounding yourself with many job opportunities from world-class companies' job fairs
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button type='primary' className='button'>
          <a href={PATH.LOGIN_PAGE}>Discover a job fair</a>
        </Button>
      </div>
    </div>
    <div className='solution-margin' />
    <div className='video-loop'>
      <div className='player-wrapper'>
        <ReactPlayer className='react-player' url='https://youtu.be/DrsZjqJIiSk' width='100%' height='100%' />
      </div>
    </div>
  </div>
);

export default HomePageHeaderComponent;
