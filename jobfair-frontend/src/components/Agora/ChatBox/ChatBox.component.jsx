import ChatField from '../ChatField/ChatField.component';
import InputEmoji from 'react-input-emoji';
import React from 'react';

const ChatBoxComponent = (props) => {
  const { messageList, videoCallComponent, onEnter } = props;
  return (
    <div className={'chat-box'}>
      <div className={'chatContainer'}>
        <div className={'videoContainer'}>{videoCallComponent()}</div>
        <div className={'chatZone'}>
          <ChatField messageList={messageList} />
        </div>
      </div>
      <div className={'chatInput'}>
        <InputEmoji cleanOnEnter onEnter={onEnter} placeholder='Type a message' />
      </div>
    </div>
  );
};

export default ChatBoxComponent;
