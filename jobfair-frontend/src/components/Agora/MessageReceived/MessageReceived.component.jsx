import { ChatMessageType } from '../../../constants/ChatMessageConst';
import { Typography } from 'antd';
import Avatar from '@mui/material/Avatar';
import styles from './MessageReceived.module.scss';

const MessageReceived = (prop) => {
  const { name, message, avatar, previousMessage } = prop;
  const isSamePerson =
    previousMessage?.type === ChatMessageType.OTHER_MESSAGE && previousMessage?.senderId !== message.senderId;
  return (
    <div className={styles.message} style={{ marginTop: isSamePerson ? '3px' : '10px' }}>
      <div className={styles.personalMessage}>
        <Typography.Text style={{ display: isSamePerson ? 'none' : 'block' }}>{name}</Typography.Text>
        <div className={styles.messageLine}>
          <Avatar alt={name} src={avatar} sx={{ width: 26, height: 26 }} />
          <div className={styles.messageReceived}>
            <div className={styles.messageReceivedText}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageReceived;
