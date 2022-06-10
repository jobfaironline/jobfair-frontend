import './HeaderHomePage.styles.scss';
import { Button } from 'antd';
import { PATH } from '../../constants/Paths/Path';
import React from 'react';
import ReactPlayer from 'react-player';

const HeaderHomePage = () => (
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

export default HeaderHomePage;
