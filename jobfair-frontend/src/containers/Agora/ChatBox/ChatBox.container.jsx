import '../../../components/Agora/ChatBox/ChatBox.styles.scss';
import { ChatMessageType } from '../../../constants/ChatMessageConst';
import { Form } from 'antd';
import { getAgoraRTMToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxComponent from '../../../components/Agora/ChatBox/ChatBox.component';
import React, { useEffect, useRef, useState } from 'react';
import VideoCallContainer from '../VideoCall/VideoCall.container';

class Message {
  constructor(senderId, content, senderName, type) {
    this.senderId = senderId;
    this.senderName = senderName;
    this.content = content;
    this.type = type;
  }
}

const ChatBoxContainer = (props) => {
  const { audioTrackRef, cameraTrackRef, type } = props;

  const name = useSelector((state) => state.authentication.user.fullName);

  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);
  const [messageList, setMessageList] = useState([]);

  //TODO: implement enter button for chat later
  // eslint-disable-next-line no-unused-vars
  const [isChatReady, setIsChatReady] = useState(false);
  const rtm = useSelector((state) => state.agora.rtmClient);
  const userId = useSelector((state) => state.authentication.user.userId);
  const channelId = useSelector((state) => state.agora.channelId);
  //because we cant get other username when they left, only their id => use map to store user's name when they joined
  const otherUserNameMapRef = useRef({});

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
    rtmClient.on('MemberJoined', async ({ channelName, args }) => {
      const memberId = args[0];
      const { name } = await rtmClient.client.getUserAttributesByKeys(memberId, ['name']);
      const newMap = otherUserNameMapRef.current;
      newMap[memberId] = name;
      otherUserNameMapRef.current = newMap;
      // eslint-disable-next-line no-console
      console.log('channel ', channelName, ' member: ', memberId, ' joined');
      setMessageList((prevState) => [...prevState, new Message(memberId, '', name, ChatMessageType.ENTER)]);
    });
    rtmClient.on('MemberLeft', async ({ channelName, args }) => {
      const memberId = args[0];
      const name = otherUserNameMapRef.current[memberId];
      // eslint-disable-next-line no-console
      console.log('channel ', channelName, ' member: ', memberId, ' leave');
      setMessageList((prevState) => [...prevState, new Message(memberId, '', name, ChatMessageType.LEAVE)]);
    });
    rtmClient.on('ChannelMessage', async ({ channelName, args }) => {
      const [message, memberId] = args;
      const { name } = await rtmClient.client.getUserAttributesByKeys(memberId, ['name']);
      if (message.messageType === 'IMAGE') {
        // eslint-disable-next-line no-unused-vars
        const blob = await rtmClient.client.downloadMedia(message.mediaId);
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        // eslint-disable-next-line no-console
        console.log(
          'channel ',
          channelName,
          ', messsage: ',
          message.text,
          ', memberId: ',
          memberId,
          'senderName: ',
          message
        );
        setMessageList((prevState) => [
          ...prevState,
          new Message(memberId, message.text, name, ChatMessageType.OTHER_MESSAGE)
        ]);
      }
    });
    await rtmClient.login(userId, rtmToken);
    await rtmClient.client.addOrUpdateLocalUserAttributes({ name });
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
    if (values !== undefined && values.length > 0) {
      rtm.sendChannelMessage(values, channelId, name);
      setMessageList((prevState) => [...prevState, new Message(userId, values, name, ChatMessageType.OWN_MESSAGE)]);
      form.resetFields();
    }
  };
  useEffect(() => {
    if (type === 'INTERVIEW_ROOM') return;
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

  return (
    <ChatBoxComponent
      messageList={messageList}
      onEnter={onSubmit}
      videoCallComponent={
        type === 'INTERVIEW_ROOM'
          ? // eslint-disable-next-line no-empty-function
            () => {}
          : () => (
              <>
                <VideoCallContainer
                  audioReady={audioReady}
                  audioTrack={audioTrack}
                  cameraReady={cameraReady}
                  cameraTrack={cameraTrack}
                  height={'350px'}
                />
              </>
            )
      }
    />
  );
};
export default ChatBoxContainer;
