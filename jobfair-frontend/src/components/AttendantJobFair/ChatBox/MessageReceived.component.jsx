import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import styles from './MessageReceived.module.scss'

const MessageReceived = prop => {
  const { name, message, avatar } = prop
  useEffect(() => console.log(message), [prop])
  return (
    <div className={styles.message}>
      <div className={styles.personalMessage}>
        <div className={styles.namePerson}>
          <Typography variant="caption" display="block" gutterBottom>
            {name}
          </Typography>
        </div>
        <div className={styles.messageLine}>
          <div className={styles.avatar}>
            <Avatar alt={name} src={avatar} sx={{ width: 26, height: 26 }} />
          </div>
          <div className={styles.messageReceived}>
            <div className={styles.messageReceivedText}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MessageReceived
