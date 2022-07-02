import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import '../../../components/Agora/VideoCall/VideoCall.styles.scss';
import { COMPANY_EMPLOYEE } from '../../../constants/RoleType';
import { NotificationType } from '../../../constants/NotificationConstant';
import { PATH, PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE } from '../../../constants/Paths/Path';
import { getAgoraRTCToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { kickUser } from '../../../services/jobhub-api/InterviewControllerService';
import { notification } from 'antd';
import { notificationAction } from '../../../redux-flow/notification/notification-slice';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useHistory } from 'react-router-dom';
import VideoCallComponent from '../../../components/Agora/VideoCall/VideoCall.component';
import { interviewRoomAction } from '../../../redux-flow/interviewRoom/interview-room-slice';

const { REACT_APP_AGORA_APP_ID } = process.env;
const VideoCallContainer = (props) => {
  const history = useHistory();
  //TODO: remove later
  const dispatch = useDispatch();
  const { audioReady, audioTrack, cameraReady, cameraTrack, type, layoutMode, userListRef, setInterviewingData } =
    props;

  const [isRTCClientReady, setIsRTCClientReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [muteState, setMuteState] = useState({ video: false, audio: false });
  const userId = useSelector((state) => state.authentication.user.userId);
  const role = useSelector((state) => state.authentication?.user?.roles);
  const rtcClient = useSelector((state) => state.agora.rtcClient);
  const channelId = useSelector((state) => state.agora.channelId);
  const webSocketClient = useSelector(selectWebSocket);

  useEffect(() => {
    webSocketClient.addEvent('is-kick', async (notificationData) => {
      if (notificationData.notificationType === NotificationType.KICK_USER) {
        const { channelId: kickChannelId } = JSON.parse(notificationData.message);
        if (kickChannelId === channelId) handleClose(true);
      }
    });
    return () => {
      webSocketClient.removeEvent('is-kick');
    };
  }, []);

  useEffect(() => {
    userListRef && (userListRef.current = users);
  }, [users]);

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

  async function initializeRTCClient(rtcClient, rtcToken, userId) {
    rtcClient.on('user-joined', async (user) => {
      setInterviewingData !== undefined &&
        setInterviewingData((prevState) => {
          if (user.uid === prevState.invitingAttendantId) return { ...prevState, isInterviewing: true };
          return prevState;
        });
      dispatch(interviewRoomAction.setRerender());
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

  const handleMute = async (type) => {
    if (type === 'audio') {
      await audioTrack.setMuted(!muteState.audio);
      setMuteState((ps) => ({ ...ps, audio: !ps.audio }));
    } else if (type === 'video') {
      await cameraTrack.setMuted(!muteState.video);
      setMuteState((ps) => ({ ...ps, video: !ps.video }));
    }
  };
  const handleClose = async (isKicked = false) => {
    await rtcClient.leave();
    notification.success({
      description: isKicked ? 'You have been removed by the host' : 'You have left the channel'
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

  const handleKickUser = (userId) => {
    kickUser(userId, channelId);
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
      kickUser={handleKickUser}
      isKickable={role === COMPANY_EMPLOYEE}
    />
  );
};
export default VideoCallContainer;
