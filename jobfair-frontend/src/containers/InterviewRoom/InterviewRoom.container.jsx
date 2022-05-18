import { Card } from 'antd';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import {
  WaitingRoomListForIntervieweeContainer,
  WaitingRoomListForInterviewerContainer
} from '../WaitingRoomList/WaitingRoomList.container';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';
import { useParams } from 'react-router-dom';

const InterviewRoomContainer = (props) => {
  const role = useSelector((state) => state.authentication.user.roles);

  const { scheduleId, roomId: channelId } = useParams();

  const { audioTrackRef, cameraTrackRef, roomType } = props;
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
          {roomType.includes('waiting-room') ? (
            <WaitingRoomListForIntervieweeContainer channelId={channelId} scheduleId={scheduleId} />
          ) : null}
          {roomType.includes('interview') && role === 'COMPANY_EMPLOYEE' ? (
            <WaitingRoomListForInterviewerContainer channelId={channelId} scheduleId={scheduleId} />
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

export default InterviewRoomContainer;
