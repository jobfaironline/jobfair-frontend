import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useRef, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';
import { Typography, Row, Col, Card, Button, notification } from 'antd';
import WaitingRoomListContainer from '../WaitingRoomList/WaitingRoomList.container';
import {
  visitWaitingRoom,
  leaveWaitingRoom,
  getWaitingRoomInfo
} from '../../services/jobhub-api/InterviewControllerService';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { NotificationType } from '../../constants/NotificationType';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const InterviewRoomContainer = (props) => {
  const role = useSelector((state) => state.authentication.user.roles);

  const { audioTrackRef, cameraTrackRef, roomType, channelId } = props;
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);

  useEffect(() => {
    AgoraRTC.createMicrophoneAudioTrack().then((track) => {
      audioTrackRef.current = track;
      setAudioTrack(track);
      setAudioReady(true);
    });
    AgoraRTC.createCameraVideoTrack().then((track) => {
      cameraTrackRef.current = track;
      setCameraTrack(track);
      setCameraReady(true);
    });
  }, []);

  return (
    <SideBarComponent
      rightSide={
        <>
          <VideoCallContainer
            audioReady={audioReady}
            audioTrack={audioTrack}
            cameraReady={cameraReady}
            cameraTrack={cameraTrack}
            type={'INTERVIEW_ROOM'}
            height={'87vh'}
            width={'100%'}
          />
        </>
      }
      leftSide={
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
          {/* TODO: dynamic this based on role */}
          {roomType.includes('waiting-room') ? <WaitingListComponent channelId={channelId} /> : null}
          {roomType.includes('interview') && role === 'COMPANY_EMPLOYEE' ? (
            <WaitingRoomListContainer channelId={channelId} />
          ) : null}
          <Card>
            <ChatBoxContainer type={'INTERVIEW_ROOM'} />
          </Card>
        </div>
      }
      ratio={1 / 4.5}
      isOrganizeJobFair={false}
    />
  );
};

const WaitingListComponent = ({ channelId }) => {
  const user = useSelector((state) => state.authentication.user);
  const [interviewTurn, setInterviewTurn] = useState(0);
  const interviewTurnRef = useRef(interviewTurn);

  //TODO: add websocket client logic
  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();

  useEffect(() => {
    visitWaitingRoom(channelId);
    webSocketClient.addEvent('get-invitation', getInvitaion);
    return () => {
      leaveWaitingRoom(channelId);
      webSocketClient.removeEvent('get-invitation', getInvitaion);
    };
  }, []);

  const getInvitaion = (notificationData) => {
    if (notificationData.notificationType === NotificationType.INTERVIEW_ROOM) {
      const messageObject = JSON.parse(notificationData.message);

      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            history.push(`/attendant/interview/${messageObject.interviewRoomId}`);
            notification.close(key);
          }}>
          Let's go!
        </Button>
      );

      notification.open({
        message: 'New invitation',
        description: 'Start your interview now!',
        btn,
        key
      });
    } else if (notificationData.notificationType === NotificationType.WAITING_ROOM) {
      checkTurn(setInterviewTurn, channelId, interviewTurnRef);
    }
  };

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Phòng chờ phỏng vấn</Typography.Title>
        <div>
          <Row>
            <Col span={10}>Số lượt tiếp theo</Col>
            <Col span={7}>{interviewTurn}</Col>
          </Row>
        </div>
        <div className='name-holder'>
          <Row>
            <Col span={10}>{user.fullName}</Col>
            <Col span={7}>9:30-10:00</Col>
            <Col span={7}>Tiếp theo</Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

const checkTurn = async (setInterviewTurn, waitingRoomId, interviewTurnRef) => {
  try {
    const { data } = await getWaitingRoomInfo(waitingRoomId);

    interviewTurnRef.current = data.turn;
    setInterviewTurn(data.turn);
  } catch (e) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
  }
};

export default InterviewRoomContainer;
