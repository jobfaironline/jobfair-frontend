import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';
import { Typography, Row, Col, Card } from 'antd';

const InterviewRoomContainer = (props) => {
  const { audioTrackRef, cameraTrackRef } = props;
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
            height={'750px'}
          />
        </>
      }
      leftSide={
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
          <WaitingListComponent />
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

export default InterviewRoomContainer;
