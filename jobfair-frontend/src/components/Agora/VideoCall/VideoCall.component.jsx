import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Button, Tag, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MailOutlined } from '@ant-design/icons';
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

const VideoCallComponent = (props) => {
  const { cameraReady, muteState, users, audioTrack, cameraTrack, handleMute, handleClose, height, width, layoutMode } =
    props;

  if (layoutMode === 'WAITINGROOM') {
    return (
      <div className={'video-call'} style={{ height: height, width: width, padding: '2rem' }}>
        <div className={'topVideoCall'} style={{ width: '95%', padding: '0rem 0.5rem' }}>
          <div className={'iconMail'}>
            <Tag color='default'>
              <MailOutlined /> 90
            </Tag>
          </div>
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
                  users.map((user) => {
                    if (user.videoTrack) {
                      return (
                        <AgoraVideoPlayer
                          style={{ height: '100%', width: '100%', margin: '0 0.5rem' }}
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
          </div>
        </div>
        <div className={'mainVideo'} style={{ height: '90%', maxHeight: 'none' }}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={cameraTrack} />
          ) : (
            <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
          )}
          <div className={'videoIcon'}>
            {audioTrack ? (
              <div className={muteState.audio ? 'on' : ''}>
                <Button
                  type='primary'
                  shape='circle'
                  size='large'
                  icon={
                    !muteState.audio ? (
                      <FontAwesomeIcon icon={faMicrophone} />
                    ) : (
                      <FontAwesomeIcon icon={faMicrophoneSlash} />
                    )
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
              <NoPhotographyIcon />
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
        </div>
      </div>
    );
  }

  return (
    <div className={'video-call'} style={{ height: height, width: width, padding: '2rem' }}>
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
      <div className={'mainVideo'} style={{ height: '90%', maxHeight: 'none' }}>
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
          {audioTrack ? (
            <div className={muteState.audio ? 'on' : ''}>
              <Button
                type='primary'
                shape='circle'
                size='large'
                icon={
                  !muteState.audio ? (
                    <FontAwesomeIcon icon={faMicrophone} />
                  ) : (
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                  )
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
            <NoPhotographyIcon />
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
      </div>
    </div>
  );
};

export default VideoCallComponent;
