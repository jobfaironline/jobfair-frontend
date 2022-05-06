import { Form } from 'antd';
import { getAgoraRTMToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { useSelector } from 'react-redux';
import InterviewChatFieldComponent from './InterviewChatField.component';
import React, { useEffect, useState } from 'react';

class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName;
    this.content = content;
    this.isMyMessage = isMyMessage;
  }
}

const InterviewChatFieldContainer = () => {
  const [form] = Form.useForm();
  const [isChatReady, setIsChatReady] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const rtm = useSelector((state) => state.agora.rtmClient);
  const channelId = useSelector((state) => state.agora.channelId);
  const userId = useSelector((state) => state.authentication.user.userId);

  const onSubmit = (values) => {
    rtm.sendChannelMessage(values.message, channelId);
    setMessageList((prevState) => [...prevState, new Message(userId, values.message, true)]);
    form.resetFields();
  };

  async function initializeRtmClient(rtmClient, rtmToken, userId) {
    rtmClient.on('ConnectionStateChanged', (newState, reason) => {
      // eslint-disable-next-line no-console
      console.log('reason', reason);
    });
    rtmClient.on('MessageFromPeer', async (message, peerId) => {
      if (message.messageType === 'IMAGE') {
        // eslint-disable-next-line no-unused-vars
        const blob = await rtm.client.downloadMedia(message.mediaId);
        /*blobToImage(blob, (image) => {
                })*/
        // eslint-disable-next-line no-console
      } else console.log(`message ${message.text} peerId${peerId}`);
    });
    rtmClient.on('MemberJoined', ({ channelName, args }) => {
      const memberId = args[0];
      // eslint-disable-next-line no-console
      console.log('channel ', channelName, ' member: ', memberId, ' joined');
    });
    rtmClient.on('MemberLeft', ({ channelName, args }) => {
      const memberId = args[0];
      // eslint-disable-next-line no-console
      console.log('channel ', channelName, ' member: ', memberId, ' joined');
    });
    rtmClient.on('ChannelMessage', async ({ channelName, args }) => {
      const [message, memberId] = args;
      if (message.messageType === 'IMAGE') {
        // eslint-disable-next-line no-unused-vars
        const blob = await rtmClient.client.downloadMedia(message.mediaId);
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        // eslint-disable-next-line no-console
        console.log('channel ', channelName, ', messsage: ', message.text, ', memberId: ', memberId);
        setMessageList((prevState) => [...prevState, new Message(memberId, message.text, false)]);
      }
    });
    await rtmClient.login(userId, rtmToken);
    await rtmClient.joinChannel(channelId);
  }

  useEffect(async () => {
    // eslint-disable-next-line no-console
    console.log('initializeRtmClient');
    const rtmToken = await getAgoraRTMToken()
      .then((value) => value.data)
      .then((value) => value.token)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
    await initializeRtmClient(rtm, rtmToken, userId);

    // eslint-disable-next-line no-console
    console.log('Ready to set chat');
    setIsChatReady(true);
  }, []);

  return (
    <>
      <InterviewChatFieldComponent
        messageList={messageList}
        form={form}
        onSubmit={onSubmit}
        isChatReady={isChatReady}
      />
    </>
  );
};

export default InterviewChatFieldContainer;
