import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useRef, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';
import { Typography, Row, Col, Card, Button, notification } from 'antd';
import {
  visitWaitingRoom,
  leaveWaitingRoom,
  getSchedule,
  inviteInterviewee
} from '../../services/jobhub-api/InterviewControllerService';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { NotificationType } from '../../constants/NotificationType';
import { useSelector } from 'react-redux';
import moment from 'moment';
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
            <IntervieweeList channelId={channelId} />
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
  const waitingRoomList = useState([]);
  const waitingRoomListRef = useRef(waitingRoomList);

  //TODO: add websocket client logic
  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();

  useEffect(() => {
    //TODO: replace later
    visitWaitingRoom(channelId);
    webSocketClient.addEvent('get-invitation', getInvitaion);
    return () => {
      //TODO: replace later
      leaveWaitingRoom(channelId);
      webSocketClient.removeEvent('get-invitation', getInvitaion);
    };
  }, []);

  const getInvitaion = (notificationData) => {
    if (notificationData.notificationType === NotificationType.INTERVIEW_ROOM) {
      // const messageObject = JSON.parse(notificationData.message);
      // const { connectedUserIds: waitingRoomList } = messageObject;

      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            history.push('/attendant/interview/123123abc');
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
    }
  };

  //TODO: remove later
  const rtcClient = useSelector((state) => state.agora.rtcClient);

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Phòng chờ phỏng vấn</Typography.Title>
        <div>
          <Row>
            <Col span={10}>Số lượt tiếp theo</Col>
            <Col span={7}>0</Col>
          </Row>
        </div>
        <div className='name-holder'>
          <Row>
            <Col span={10}>Trường Trần Tiến</Col>
            <Col span={7}>9:00-9:30</Col>
            <Col span={7}>Tiếp theo</Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

//TODO: implemnt interviewer get interviewee component
const IntervieweeList = ({ channelId }) => {
  const [intervieweeList, setIntervieweeList] = useState([]);
  const intervieweeListRef = useRef(intervieweeList);
  const [pivotDate, setPivotDate] = useState(moment());

  const intervieweeInRoom = useSelector((state) => state.notification.inRoom);

  const fetchData = async () => {
    try {
      let data = (
        await getSchedule({
          beginTime: pivotDate.subtract(1, 'm').unix() * 1000,
          endTime: pivotDate.add(15, 'd').unix() * 1000
        })
      ).data;

      data = data.map((item) => {
        const date = moment.unix(item.beginTime / 1000);
        return {
          ...item,
          day: date.date(),
          month: date.month(),
          year: date.year(),
          title: item.name,
          timeStart: item.beginTime,
          timeEnd: item.endTime,
          interviewLink: item.url,
          badgeType: item.status,
          inRoom: false
        };
      });
      intervieweeListRef.current = data;
      setIntervieweeList(data);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  useEffect(() => {
    //TODO: replace api later
    fetchData();
  }, []);

  //TODO: add websocket client logic
  const webSocketClient = useSelector(selectWebSocket);

  useEffect(() => {
    //TODO: replace later
    visitWaitingRoom('iumauhong123');
    webSocketClient.addEvent('change-waiting-room-list', changeWaitingRoomList);
    return () => {
      //TODO: replace later
      leaveWaitingRoom('iumauhong123');
      webSocketClient.removeEvent('change-waiting-room-list', changeWaitingRoomList);
    };
  }, []);

  const changeWaitingRoomList = (notificationData) => {
    if (!intervieweeListRef.current || !notificationData) return;
    if (notificationData.notificationType === NotificationType.WAITING_ROOM) {
      const messageObject = JSON.parse(notificationData.message);
      const { connectedUserIds: waitingRoomList } = messageObject;

      intervieweeListRef.current = intervieweeListRef.current.map((attendant) => {
        if (waitingRoomList.includes(attendant.attendantId)) {
          return {
            //in room
            ...attendant,
            inRoom: true
          };
        } else {
          return {
            // not in room
            ...attendant,
            inRoom: false
          };
        }
      });
      setIntervieweeList(
        intervieweeListRef.current.map((attendant) => {
          if (waitingRoomList.includes(attendant.attendantId)) {
            return {
              //in room
              ...attendant,
              inRoom: true
            };
          } else {
            return {
              // not in room
              ...attendant,
              inRoom: false
            };
          }
        })
      );
    }
  };

  const handleInvite = (attendantId) => {
    inviteInterviewee(attendantId, 'iumauhong123').catch((err) => {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while sending invitation, try again later`,
        duration: 2
      });
    });
  };

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
        {intervieweeList.map((interviewee) => {
          return (
            <div className='name-holder'>
              <Row>
                <Col span={10}>{interviewee.attendantId}</Col>
                <Col span={7}>{interviewee.beginTime}</Col>
                <Col span={7}>
                  <Button
                    type='primary'
                    shape='round'
                    disabled={!interviewee.inRoom} //TODO: remove later
                    onClick={() => handleInvite(interviewee.attendantId)}>
                    {!interviewee.inRoom ? (intervieweeInRoom ? 'In room' : 'Not in room') : 'invite'}
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default InterviewRoomContainer;
