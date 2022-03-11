import React from "react";

export const ChatFeed = (props) => {
  const {messageList} = props;
  return (
    <div>
      {messageList.map(message => {
        if (message.isMyMessage) {
          return <div style={{display: "flex"}}>
            <div style={{marginLeft: "auto"}}>Sender: {message.accountName} - Text: {message.content}</div>
          </div>;
        } else {
          return <div>Sender: {message.accountName} - Text: {message.content}</div>;
        }
      })}
    </div>
  );
}