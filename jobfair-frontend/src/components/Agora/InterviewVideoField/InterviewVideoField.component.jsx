import { AgoraVideoPlayer } from 'agora-rtc-react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const InterviewVideoFieldComponent = (props) => {
  const { cameraReady, muteState, users, audioTrack, cameraTrack, handleMute } = props;
  return (
    <div>
      {cameraReady && !muteState.video ? (
        <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={cameraTrack} />
      ) : (
        <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
      )}
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
      {audioTrack ? (
        <div className={muteState.audio ? 'on' : ''} onClick={() => handleMute('audio')}>
          {!muteState.audio ? <MicIcon /> : <MicOffIcon />}
        </div>
      ) : (
        <PowerOffIcon />
      )}
      {cameraTrack ? (
        <div className={muteState.video ? 'on' : ''} onClick={() => handleMute('video')}>
          {!muteState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </div>
      ) : (
        <NoPhotographyIcon />
      )}
    </div>
  );
};

export default InterviewVideoFieldComponent;