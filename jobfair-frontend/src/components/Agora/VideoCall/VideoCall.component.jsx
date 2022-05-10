import { MailOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AgoraVideoPlayer } from 'agora-rtc-react';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import './VideoCall.styles.scss';
import { getAgoraRTCToken } from '../../../services/jobhub-api/AgoraTokenControllerService';

const { REACT_APP_AGORA_APP_ID } = process.env;
const VideoCall = (props) => {
  const { audioReady, audioTrack, cameraReady, cameraTrack } = props;
  const [isRTCClientReady, setIsRTCClientReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [muteState, setMuteState] = useState({ video: false, audio: false });
  const userId = useSelector((state) => state.authentication.user.userId);

  async function initializeRTCClient(rtcClient, rtcToken, userId) {
    rtcClient.on('user-published', async (user, mediaType) => {
      await rtcClient.subscribe(user, mediaType);
      // eslint-disable-next-line no-console
      console.log('subscribe success');
      if (mediaType === 'video') setUsers((prevUsers) => [...prevUsers, user]);

      if (mediaType === 'audio') user.audioTrack?.play();
    });

    rtcClient.on('user-unpublished', (user, type) => {
      // eslint-disable-next-line no-console
      console.log('unpublished', user, type);
      if (type === 'audio') user.audioTrack?.stop();

      if (type === 'video') setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    });

    rtcClient.on('user-left', (user) => {
      // eslint-disable-next-line no-console
      console.log('leaving', user);
      setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    });

    await rtcClient.join(REACT_APP_AGORA_APP_ID, channelId, rtcToken, userId);
  }

  const rtcClient = useSelector((state) => state.agora.rtcClient);
  const channelId = useSelector((state) => state.agora.channelId);
  useEffect(async () => {
    const rtcToken = await getAgoraRTCToken(channelId)
      .then((value) => value.data)
      .then((value) => value.token);
    await initializeRTCClient(rtcClient, rtcToken, userId);
    setIsRTCClientReady(true);
  }, []);

  useEffect(async () => {
    if (isRTCClientReady && audioReady && audioTrack) await rtcClient.publish(audioTrack);
    if (isRTCClientReady && cameraReady && cameraTrack) await rtcClient.publish(cameraTrack);
  }, [cameraReady, audioReady, isRTCClientReady]);

  const handleMute = async (type) => {
    if (type === 'audio') {
      await audioTrack.setMuted(!muteState.audio);
      setMuteState((ps) => ({ ...ps, audio: !ps.audio }));
    } else if (type === 'video') {
      await cameraTrack.setMuted(!muteState.video);
      setMuteState((ps) => ({ ...ps, video: !ps.video }));
    }
  };
  return (
    <div className={'video-call'}>
      <div className={'topVideoCall'}>
        <div className={'iconMail'}>
          <Tag color='default'>
            <MailOutlined /> 90
          </Tag>
        </div>
        <div className={'videoCall'}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={cameraTrack} />
          ) : (
            <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
          )}
        </div>
      </div>
      <div className={'mainVideo'}>
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
      </div>
    </div>
  );
};
export default VideoCall;
