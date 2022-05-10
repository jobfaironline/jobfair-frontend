import { AgoraVideoPlayer } from 'agora-rtc-react';
import { MailOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faVideoCamera,
  faVideoSlash
} from '@fortawesome/free-solid-svg-icons';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const VideoCallComponent = (props) => {
  const { cameraReady, muteState, users, audioTrack, cameraTrack, handleMute, type, handleClose } = props;
  return (
    <div className={'video-call'} style={{ height: '100%', padding: '2rem' }}>
      <div className={'topVideoCall'} style={{ width: '95%', padding: '0rem 0.5rem' }}>
        <div className={'iconMail'}>
          <Tag color='default'>
            <MailOutlined /> 90
          </Tag>
        </div>
        {/*TODO: the 'type' props will decide the style of component*/}
        <div className={'videoCall'}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={cameraTrack} />
          ) : (
            <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
          )}
        </div>
      </div>
      <div className={'mainVideo'} style={{ height: '85%', maxHeight: 'none' }}>
        {users.length > 0 ? (
          <div style={{ height: '100%' }}>
            {users.length > 0 &&
              users.map((user) => {
                if (user.videoTrack) {
                  return (
                    <AgoraVideoPlayer
                      style={{ height: '100%', width: '100%' }}
                      className='vid'
                      videoTrack={user.videoTrack}
                      key={user.uid}
                    />
                  );
                } else return null;
              })}
          </div>
        ) : (
          <img
            src='https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg'
            alt='Girl in a jacket'
            width='100%'
            height='100%'
          />
        )}
        <div className={'videoIcon'}>
          {cameraTrack ? (
            <div className={muteState.video ? 'on' : ''} onClick={() => handleMute('video')}>
              {!muteState.video ? (
                <Tooltip title='Turn off camera'>
                  <FontAwesomeIcon icon={faVideoCamera} />
                </Tooltip>
              ) : (
                <Tooltip title='Turn on camera'>
                  <FontAwesomeIcon icon={faVideoSlash} />
                </Tooltip>
              )}
            </div>
          ) : (
            <NoPhotographyIcon />
          )}
          {audioTrack ? (
            <div className={muteState.audio ? 'on' : ''}>
              <Button
                type='primary'
                shape='circle'
                size='large'
                icon={!muteState.audio ? <MicIcon /> : <MicOffIcon />}
                onClick={() => handleMute('audio')}
              />
            </div>
          ) : (
            <PowerOffIcon />
          )}
          {cameraTrack ? (
            <div className={muteState.video ? 'on' : ''}>
              <Button
                type='primary'
                shape='circle'
                size='large'
                icon={!muteState.video ? <VideocamIcon /> : <VideocamOffIcon />}
                onClick={() => handleMute('video')}
              />
            </div>
          ) : (
            <NoPhotographyIcon />
          )}
          <Button
            type='primary'
            shape='circle'
            size='large'
            icon={<CallEndIcon />}
            onClick={() => {
              /*end call*/
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCallComponent;
