import { CloseOutlined, ArrowsAltOutlined, MinusOutlined, MailOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import styles from './ChatBox.module.scss'
import ChatField from './components/ChatField/ChatField.component'
import VideoCall from './components/VideoCall/VideoCall.component'
import SendIcon from '@mui/icons-material/Send'
const ChatBox = () => {
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
            <VideoCall />
          </div>
          <div className={styles.chatZone}>
            <ChatField />
          </div>
        </div>
        <div className={styles.chatInput}>
          <Input placeholder="Type message..." style={{ borderRadius: '5rem 5rem 5rem 5rem' }} suffix={<SendIcon />} />
        </div>
      </div>
    </>
  )
}
export default ChatBox
