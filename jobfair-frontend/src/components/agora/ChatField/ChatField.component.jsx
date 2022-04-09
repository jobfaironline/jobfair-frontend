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
      {messageList?.map((message) => {
        if (message.isMyMessage) return <MessageSent name={message.accountName} message={message.content} />;
        else return <MessageReceived name={message.accountName} message={message.content} />;
      })}
      <div ref={endChatRef} />
    </div>
  );
};
export default ChatField;
