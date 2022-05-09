import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
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
          />
        </>
      }
      leftSide={<ChatBoxContainer type={'INTERVIEW_ROOM'} />}
      ratio={450 / 1728}
      isOrganizeJobFair={false}
    />
  );
};

export default InterviewRoomContainer;