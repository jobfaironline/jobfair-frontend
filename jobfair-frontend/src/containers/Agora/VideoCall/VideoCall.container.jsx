import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../../../components/Agora/VideoCall/VideoCall.styles.scss';
import { PATH, PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE } from '../../../constants/Paths/Path';
import { getAgoraRTCToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { notificationAction } from '../../../redux-flow/notification/notification-slice';
import VideoCallComponent from '../../../components/Agora/VideoCall/VideoCall.component';

const { REACT_APP_AGORA_APP_ID } = process.env;
const VideoCallContainer = (props) => {
  const history = useHistory();
  //TODO: remove later
  const dispatch = useDispatch();
  const { audioReady, audioTrack, cameraReady, cameraTrack, type, layoutMode } = props;
  const [isRTCClientReady, setIsRTCClientReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [muteState, setMuteState] = useState({ video: false, audio: false });
  const userId = useSelector((state) => state.authentication.user.userId);
  const role = useSelector((state) => state.authentication?.user?.roles);

  async function initializeRTCClient(rtcClient, rtcToken, userId) {
    rtcClient.on('user-joined', async (user, mediaType) => {
      dispatch(notificationAction.setInRoom(true)); //TODO: remove later
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    rtcClient.on('user-published', async (user, mediaType) => {
      await rtcClient.subscribe(user, mediaType);

      // eslint-disable-next-line no-console
      console.log('subscribe success');

      if (mediaType === 'video') {
        setUsers((prevUsers) => {
          const tmp = prevUsers.filter((User) => User.uid !== user.uid);
          return [...tmp, user];
        });
      }

      if (mediaType === 'audio') user?.audioTrack?.play();
    });

    rtcClient.on('user-unpublished', (user, type) => {
      // eslint-disable-next-line no-console
      console.log('unpublished', user, type);
      if (type === 'audio') user.audioTrack?.stop();

      if (type === 'video') user.videoTrack?.stop();
      setUsers((prevUsers) => [...prevUsers]);
    });

    rtcClient.on('user-left', (user) => {
      // eslint-disable-next-line no-console
      console.log('leaving', user);
      dispatch(notificationAction.setInRoom(false)); //TODO: remove later
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
  const handleClose = async () => {
    await rtcClient.leave();
    notification.success({
      description: 'You have left the channel'
    });
    if (type === 'INTERVIEW_ROOM') {
      switch (role) {
        case 'ATTENDANT': {
          history.push(PATH_ATTENDANT.INTERVIEW_SCHEDULE);
          break;
        }
        case 'COMPANY_EMPLOYEE': {
          history.push(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE);
          break;
        }
      }
    } else history.push(PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE);
  };
  return (
    <VideoCallComponent
      cameraReady={cameraReady}
      muteState={muteState}
      users={users}
      audioTrack={audioTrack}
      cameraTrack={cameraTrack}
      handleMute={handleMute}
      handleClose={handleClose}
      height={props.height}
      width={props.width}
      layoutMode={layoutMode}
    />
  );
};
export default VideoCallContainer;
