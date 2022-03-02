import { Tag } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import CallIcon from '@mui/icons-material/Call'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import MicNoneIcon from '@mui/icons-material/MicNone'
import styles from './VideoCall.module.scss'
const VideoCall = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topVideoCall}>
        <div className={styles.iconMail}>
          <Tag color="default">
            <MailOutlined /> 90
          </Tag>
        </div>
        <div className={styles.videoCall}>{/* //video element */}</div>
      </div>
      <div className={styles.mainVideo}>
        <div className={styles.videoIcon}>
          <CallIcon />
          <VideocamOffIcon />
          <MicNoneIcon />
        </div>
      </div>
    </div>
  )
}
export default VideoCall
