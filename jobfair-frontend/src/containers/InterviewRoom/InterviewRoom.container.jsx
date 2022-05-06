import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import InterviewChatFieldContainer from '../../components/Agora/ChatBox/InterviewChatField.container';
import InterviewVideoFieldContainer from '../../components/Agora/VideoCall/InterviewVideoField.container';
import React from 'react';

const InterviewRoomContainer = (props) => {
  const { audioTrackRef, cameraTrackRef } = props;

  return (
    <SideBarComponent
      rightSide={
        <>
          <InterviewVideoFieldContainer audioTrackRef={audioTrackRef} cameraTrackRef={cameraTrackRef} />
        </>
      }
      leftSide={<InterviewChatFieldContainer />}
      ratio={450 / 1728}
      isOrganizeJobFair={false}
    />
  );
};

export default InterviewRoomContainer;
