import { Typography } from 'antd';
import styles from './MessageSent.module.scss';

const MessageSent = (prop) => {
  const { name, message, previousMessage } = prop;
  const isSamePerson = previousMessage?.senderId !== message.senderId;
  return (
    <div className={styles.message} style={{ marginTop: isSamePerson ? '3px' : '10px' }}>
      <div className={styles.personalMessage}>
        <div className={styles.messageLine}>
          <div className={styles.messageSent}>
            <Typography.Text style={{ display: isSamePerson ? 'none' : 'block' }}>{name}</Typography.Text>
            <div className={styles.messageSentText}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageSent;
