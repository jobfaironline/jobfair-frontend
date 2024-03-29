import './VideoCall.styles.scss';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Avatar, Badge, Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserOutlined } from '@ant-design/icons';
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

const VideoButtonControlGroup = (props) => {
  const { audioTrack, cameraTrack, muteState, handleMute, handleClose } = props;
  return (
    <div className={'videoIcon'}>
      {audioTrack ? (
        <div className={muteState.audio ? 'on' : ''}>
          <Button
            type='primary'
            shape='circle'
            size='large'
            icon={
              !muteState.audio ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />
            }
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
            icon={
              !muteState.video ? (
                <Tooltip title='Turn off camera'>
                  <FontAwesomeIcon icon={faVideoCamera} />
                </Tooltip>
              ) : (
                <Tooltip title='Turn on camera'>
                  <FontAwesomeIcon icon={faVideoSlash} />
                </Tooltip>
              )
            }
            onClick={() => handleMute('video')}
          />
        </div>
      ) : (
        <Button disabled={true} type='primary' shape='circle' size='large' icon={<NoPhotographyIcon />} />
      )}
      <Button
        type='primary'
        shape='circle'
        size='large'
        icon={
          <Tooltip title='Leave call'>
            <FontAwesomeIcon icon={faPhone} />
          </Tooltip>
        }
        onClick={() => handleClose()}
      />
    </div>
  );
};

const EmptyScreen = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      margin: '0 0.5rem',
      background: '#000'
    }}>
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <h1 style={{ color: '#FFF' }}>No one is here</h1>
    </div>
  </div>
);

const UserOffScreen = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      margin: '0 0.5rem',
      background: '#000'
    }}>
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Avatar shape='circle' size={256 / 2} icon={<UserOutlined />} />
    </div>
  </div>
);

const VideoCallComponent = (props) => {
  const {
    cameraReady,
    muteState,
    users,
    audioTrack,
    cameraTrack,
    handleMute,
    handleClose,
    height,
    width,
    layoutMode,
    kickUser,
    isKickable = false
  } = props;

  const buttonControlGroupProps = { audioTrack, cameraTrack, muteState, handleMute, handleClose };

  if (layoutMode === 'WAITINGROOM') {
    return (
      <div className={'video-call'} style={{ height, width, padding: '2rem' }}>
        <div className={'topVideoCall'} style={{ padding: '0rem 0.5rem' }}>
          <div className={'iconMail'} />
          {/*TODO: the 'type' props will decide the style of component*/}
          <div className={'videoCall'}>
            {users.length > 0 ? (
              <div
                style={{
                  height: '100%',
                  width: `${users.length > 0 ? 10 * users.length : 10}rem`,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                {users.length > 0 &&
                  users.map((user, index) => {
                    if (index < 2) {
                      if (user.videoTrack) {
                        return (
                          <AgoraVideoPlayer
                            style={{ height: '100%', width: '100%', margin: '0 0.5rem' }}
                            className='vid'
                            videoTrack={user.videoTrack}
                            key={user.uid}
                          />
                        );
                      } else {
                        return (
                          <div
                            style={{
                              height: '100%',
                              width: '10rem',
                              margin: '0 0.5rem',
                              background: '#000'
                            }}>
                            <div
                              style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              <Avatar shape='circle' size={64} icon={<UserOutlined />} />
                            </div>
                          </div>
                        );
                      }
                    } else {
                      //more than 2
                      return (
                        <div
                          style={{
                            height: '100%',
                            width: '10rem',
                            margin: '0 0.5rem',
                            background: '#000'
                          }}>
                          <div
                            style={{
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                            <Badge count={users.length - 2}>
                              <Avatar shape='circle' size='large' />
                            </Badge>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            ) : null}
          </div>
        </div>
        <div className={'mainVideo'} style={{ height: '90%', maxHeight: 'none' }}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className='vid' videoTrack={cameraTrack} />
          ) : (
            <div
              style={{
                height: '100%',
                width: '100%',
                margin: '0 0.5rem',
                background: '#000'
              }}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Avatar shape='circle' size={180} icon={<UserOutlined />} />
              </div>
            </div>
          )}
        </div>
        <VideoButtonControlGroup {...buttonControlGroupProps} />
      </div>
    );
  }

  return (
    <div className={'video-call'} style={{ height, width, padding: '2rem' }}>
      <div className={'topVideoCall'} style={{ padding: '0rem 0.5rem' }}>
        <div className={'videoCall'} style={{ width: '11rem' }}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={cameraTrack} />
          ) : (
            <div
              style={{
                height: '100%',
                width: '100%',
                margin: '0 0.5rem',
                background: '#000'
              }}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Avatar shape='circle' size={64} icon={<UserOutlined />} />
              </div>
            </div>
          )}
        </div>
      </div>
      {users.length > 1 ? (
        <div style={{ position: 'absolute', right: '4rem', top: '3rem' }}>
          <Badge count={users.length}>
            <Avatar shape='circle' size='large' icon={<UserOutlined />} />
          </Badge>
        </div>
      ) : null}

      <div className={'mainVideo'} style={{ height: '90%', maxHeight: 'none' }}>
        {users.length > 0 ? (
          <>
            {users.map((user) => {
              if (user.videoTrack) {
                return (
                  <div style={{ height: '100%', width: '100%', scrollSnapAlign: 'center' }}>
                    <AgoraVideoPlayer
                      style={{ height: '100%', width: '100%' }}
                      className='vid'
                      videoTrack={user.videoTrack}
                      key={user.uid}
                    />
                    {isKickable ? <div className={'user-icon'} /> : null}
                    {isKickable ? (
                      <div className={'user-mask'}>
                        <Tooltip title={'Remove this user'}>
                          <div
                            style={{ color: '#FFF' }}
                            onClick={() => {
                              kickUser(user.uid);
                            }}>
                            Remove
                          </div>
                        </Tooltip>
                      </div>
                    ) : null}
                  </div>
                );
              }
              return <UserOffScreen />;
            })}
          </>
        ) : (
          <EmptyScreen />
        )}
      </div>
      <VideoButtonControlGroup {...buttonControlGroupProps} />
    </div>
  );
};

export default VideoCallComponent;
