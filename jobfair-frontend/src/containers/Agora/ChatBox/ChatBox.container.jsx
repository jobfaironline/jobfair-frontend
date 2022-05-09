import '../../../components/Agora/ChatBox/ChatBox.styles.scss';
import { Form } from 'antd';
import { getAgoraRTMToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxComponent from '../../../components/Agora/ChatBox/ChatBox.component';
import InterviewChatFieldComponent from '../../../components/Agora/InterviewChatField/InterviewChatField.component';
import React, { useEffect, useState } from 'react';

class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName;
    this.content = content;
    this.isMyMessage = isMyMessage;
  }
}

const ChatBoxContainer = (props) => {
  const { audioTrackRef, cameraTrackRef, type } = props;
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [isChatReady, setIsChatReady] = useState(false);
  const rtm = useSelector((state) => state.agora.rtmClient);
  const userId = useSelector((state) => state.authentication.user.userId);
  const channelId = useSelector((state) => state.agora.channelId);
  //handle button Chat
  const [isShowChatBox, setIsShowChatBox] = useState(true);

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

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    if (values.message.length > 0) {
      rtm.sendChannelMessage(values.message, channelId);
      setMessageList((prevState) => [...prevState, new Message(userId, values.message, true)]);
      form.resetFields();
    }
  };
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

  if (type === 'INTERVIEW_ROOM') {
    return (
      <InterviewChatFieldComponent
        messageList={messageList}
        form={form}
        onSubmit={onSubmit}
        isChatReady={isChatReady}
      />
    );
  } else {
    return (
      <ChatBoxComponent
        isShowChatBox={isShowChatBox}
        setIsShowChatBox={setIsShowChatBox}
        messageList={messageList}
        form={form}
        onSubmit={onSubmit}
        isChatReady={isChatReady}
        audioReady={audioReady}
        audioTrack={audioTrack}
        cameraReady={cameraReady}
        cameraTrack={cameraTrack}
      />
    );
  }
};
export default ChatBoxContainer;
