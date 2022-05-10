import ChatField from '../ChatField/ChatField.component';
import InputEmoji from 'react-input-emoji';
import React from 'react';

const InterviewChatFieldComponent = (props) => {
  const { messageList, text, onEnter } = props;
  return (
    <>
      <ChatField messageList={messageList} />
      <div style={{ marginTop: '40rem' }}>
        <InputEmoji value={text} cleanOnEnter onEnter={onEnter} placeholder='Type a message' />
      </div>
    </>
  );
};

export default InterviewChatFieldComponent;
