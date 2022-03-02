import { CloseOutlined, ArrowsAltOutlined, MinusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import styles from './ChatBox.module.scss'
import ChatField from './components/ChatField/ChatField.component'
import VideoCall from './components/VideoCall/VideoCall.component'
import AgoraRTC from 'agora-rtc-react'
import SendIcon from '@mui/icons-material/Send'
import { getAgoraRTMToken } from '../../../../services/agoraTokenService'
import { useSelector } from 'react-redux'
import { Form, Button } from 'antd'
class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName
    this.content = content
    this.isMyMessage = isMyMessage
  }
}
const ChatBox = props => {
  const { audioTrackRef, cameraTrackRef } = props
  const [audioReady, setAudioReady] = useState(false)
  const [audioTrack, setAudioTrack] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraTrack, setCameraTrack] = useState(null)
  const [messageList, setMessageList] = useState([])
  const [isChatReady, setIsChatReady] = useState(false)
  const rtm = useSelector(state => state.agora.rtmClient)
  const userId = useSelector(state => state.authentication.user.userId)
  const channelId = useSelector(state => state.agora.channelId)

  async function initializeRtmClient(rtmClient, rtmToken, userId) {
    rtmClient.on('ConnectionStateChanged', (newState, reason) => {
      console.log('reason', reason)
    })
    rtmClient.on('MessageFromPeer', async (message, peerId) => {
      if (message.messageType === 'IMAGE') {
        const blob = await rtm.client.downloadMedia(message.mediaId)
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        console.log('message ' + message.text + ' peerId' + peerId)
      }
    })
    rtmClient.on('MemberJoined', ({ channelName, args }) => {
      const memberId = args[0]
      console.log('channel ', channelName, ' member: ', memberId, ' joined')
    })
    rtmClient.on('MemberLeft', ({ channelName, args }) => {
      const memberId = args[0]
      console.log('channel ', channelName, ' member: ', memberId, ' joined')
    })
    rtmClient.on('ChannelMessage', async ({ channelName, args }) => {
      const [message, memberId] = args
      if (message.messageType === 'IMAGE') {
        const blob = await rtmClient.client.downloadMedia(message.mediaId)
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        console.log('channel ', channelName, ', messsage: ', message.text, ', memberId: ', memberId)
        setMessageList(prevState => {
          return [...prevState, new Message(memberId, message.text, false)]
        })
      }
    })
    await rtmClient.login(userId, rtmToken)
    await rtmClient.joinChannel(channelId)
  }

  useEffect(async () => {
    console.log('initializeRtmClient')
    const rtmToken = await getAgoraRTMToken()
      .then(value => value.data)
      .then(value => value.token)
      .catch(err => console.log(err))
    await initializeRtmClient(rtm, rtmToken, userId)
    console.log('Ready to set chat')
    setIsChatReady(true)
  }, [])

  const [form] = Form.useForm()
  const onSubmit = values => {
    rtm.sendChannelMessage(values.message, channelId)

    setMessageList(prevState => {
      return [...prevState, new Message(userId, values.message, true)]
    })
    form.resetFields()
  }
  useEffect(() => {
    AgoraRTC.createMicrophoneAudioTrack().then(track => {
      audioTrackRef.current = track
      setAudioTrack(track)
      setAudioReady(true)
    })
    AgoraRTC.createCameraVideoTrack().then(track => {
      cameraTrackRef.current = track
      setCameraTrack(track)
      setCameraReady(true)
    })
  }, [])

  const videoProps = { audioReady, audioTrack, cameraReady, cameraTrack }

  return (
    <>
      <div className={styles.chatBubble}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.iconHeader}>
              <ArrowsAltOutlined />
              <MinusOutlined />
              <CloseOutlined />
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
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Please input your message!'
                }
              ]}
            >
              <Input
                autoFocus
                style={{ borderRadius: '5rem 5rem 5rem 5rem' }}
                placeholder="Type message..."
                suffix={<SendIcon />}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default ChatBox
