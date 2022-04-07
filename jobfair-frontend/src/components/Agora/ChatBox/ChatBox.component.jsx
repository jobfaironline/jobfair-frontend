import { ArrowsAltOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { REQUIRED_VALIDATOR } from '../../../validate/GeneralValidation';
import { getAgoraRTMToken } from '../../../services/agora-token-controller/AgoraTokenControllerService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatField from '../ChatField/ChatField.component';
import SendIcon from '@mui/icons-material/Send';
import VideoCall from '../VideoCall/VideoCall.component';
import styles from './ChatBox.module.scss';

class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName;
    this.content = content;
    this.isMyMessage = isMyMessage;
  }
}

const ChatBox = (props) => {
  const { audioTrackRef, cameraTrackRef } = props;
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
    rtm.sendChannelMessage(values.message, channelId);

    setMessageList((prevState) => [...prevState, new Message(userId, values.message, true)]);
    form.resetFields();
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

  const videoProps = { audioReady, audioTrack, cameraReady, cameraTrack };

  return (
    <>
      {isShowChatBox ? (
        <div className={styles.chatBubble}>
          <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
              <div className={styles.iconHeader}>
                <ArrowsAltOutlined />
                <MinusOutlined />
                <CloseOutlined onClick={() => setIsShowChatBox(false)} />
              </div>
            </div>
            <div className={styles.videoContainer}>
              <VideoCall {...videoProps} />
            </div>
            <div className={styles.chatZone}>
              <ChatField messageList={messageList} />
            </div>
          </div>
          <div className={styles.chatInput}>
            <Form form={form} onFinish={onSubmit} disabled={!isChatReady}>
              <Form.Item name='message' rules={[REQUIRED_VALIDATOR('Message')]}>
                <Input
                  autoFocus
                  style={{ borderRadius: '5rem 5rem 5rem 5rem' }}
                  placeholder='Type message...'
                  suffix={<SendIcon />}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default ChatBox;
