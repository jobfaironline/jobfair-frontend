import { Button, Card, Col, Row, Typography } from 'antd';
import { PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { generatePath, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';

const InterviewRoomContainer = (props) => {
  const { audioTrackRef, cameraTrackRef } = props;
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);

  const role = useSelector((state) => state.authentication?.user?.roles);

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
          <WaitingListComponent role={role} />
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

const WaitingListComponent = ({ role }) => {
  const history = useHistory();
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
        <Button
          type='primary'
          onClick={() => {
            let url = '';
            if (role === 'ATTENDANT') {
              url = generatePath(PATH_ATTENDANT.WAITING_INTERVIEW_ROOM_PAGE, {
                roomId: 'iumauhong123'
              });
            } else {
              url = generatePath(PATH_COMPANY_EMPLOYEE.WAITING_INTERVIEW_ROOM_PAGE, {
                roomId: 'iumauhong123'
              });
            }
            history.push(url);
          }}>
          Waiting room
        </Button>
      </div>
    </Card>
  );
};
export default InterviewRoomContainer;
