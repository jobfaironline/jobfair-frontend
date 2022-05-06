import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import InterviewChatFieldContainer from '../../components/Agora/ChatBox/InterviewChatField.container';
import React from 'react';
import VideoCallContainer from '../../components/Agora/VideoCall/VideoCall.container';

const InterviewRoomContainer = (props) => {
  const { communicationProps } = props;

  return (
    <SideBarComponent
      rightSide={
        <>
          <VideoCallContainer
            audioReady={audioReady}
            audioTrack={audioTrack}
            cameraReady={cameraReady}
            cameraTrack={cameraTrack}
          />
        </>
      }
      leftSide={<InterviewChatFieldContainer />}
      ratio={450 / 1728}
      isOrganizeJobFair={false}
    />
  );
};

export default InterviewRoomContainer;
