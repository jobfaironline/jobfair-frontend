import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';
import { Typography, Row, Col, Card, Button } from 'antd';
import { useSelector } from 'react-redux';

const InterviewRoomContainer = (props) => {
  const role = useSelector((state) => state.authentication.user.roles);

  const { audioTrackRef, cameraTrackRef, roomType } = props;
  console.log(roomType);
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
          {roomType.includes('waiting-room') ? <WaitingListComponent /> : null}
          {roomType.includes('interview') && role === 'COMPANY_EMPLOYEE' ? <IntervieweeList /> : null}
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

const WaitingListComponent = () => {
  //TODO: add websocket client logic

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Phòng chờ phỏng vấn</Typography.Title>
        <div>
          <Row>
            <Col span={10}>Số lượt tiếp theo</Col>
            <Col span={7}>5</Col>
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
const IntervieweeList = () => {
  //TODO: add websocket client logic

  const fakeData = [
    {
      name: 'Trương Trần Tiến',
      interviewTime: '9:00-9:30',
      status: 'IN_ROOM'
    },
    {
      name: 'Phạm Cao Sơn',
      interviewTime: '10:00-10:30',
      status: 'NOT_IN_ROOM'
    }
  ];

  return (
    <Card>
      <div>
        <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
        {fakeData.map((interviewee) => {
          return (
            <div className='name-holder'>
              <Row>
                <Col span={10}>{interviewee.name}</Col>
                <Col span={7}>{interviewee.interviewTime}</Col>
                <Col span={7}>
                  <Button type='primary' shape='round' disabled={interviewee.status === 'NOT_IN_ROOM'}>
                    {interviewee.status === 'NOT_IN_ROOM' ? 'Not in room' : 'invite'}
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
