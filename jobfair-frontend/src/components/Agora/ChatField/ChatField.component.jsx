import { ChatMessageType } from '../../../constants/ChatMessageConst';
import MessageReceived from '../MessageReceived/MessageReceived.component';
import MessageSent from '../MessageSent/MessageSent.component';
import React, { useEffect, useRef } from 'react';
import styles from './ChatField.module.scss';

const ChatField = (prop) => {
  const { messageList } = prop;
  const endChatRef = useRef();
  useEffect(() => {
    endChatRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <div className={styles.container}>
      {messageList?.map((message, index) => {
        const previousMessage = messageList[index - 1];
        switch (message.type) {
          case ChatMessageType.OWN_MESSAGE:
            return (
              <MessageSent name={message.senderName} message={message.content} previousMessage={previousMessage} />
            );
          case ChatMessageType.OTHER_MESSAGE:
            return (
              <MessageReceived name={message.senderName} message={message.content} previousMessage={previousMessage} />
            );
          case ChatMessageType.LEAVE:
            return <div style={{ display: 'flex', justifyContent: 'center' }}>{message.senderName} has left</div>;
          case ChatMessageType.ENTER:
            return <div style={{ display: 'flex', justifyContent: 'center' }}>{message.senderName} has enter</div>;
        }
      })}
      <div ref={endChatRef} />
    </div>
  );
};
export default ChatField;
