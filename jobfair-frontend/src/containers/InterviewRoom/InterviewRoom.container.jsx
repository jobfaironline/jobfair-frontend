import ChatBoxContainer from '../../components/Agora/ChatBox/ChatBox.container';
import React from 'react';

const InterviewRoomContainer = (props) => {
  const { communicationProps } = props;

  return <ChatBoxContainer {...communicationProps} type='INTERVIEW_ROOM' />;
};

export default InterviewRoomContainer;
