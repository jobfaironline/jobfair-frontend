import { Typography } from 'antd';
import { useEffect } from 'react';
import styles from './MessageSent.module.scss';

const MessageSent = (prop) => {
  // eslint-disable-next-line no-unused-vars
  const { name, message } = prop;
  // eslint-disable-next-line no-console
  useEffect(() => console.log(message), [prop]);
  return (
    <div className={styles.message}>
      <div className={styles.personalMessage}>
        <div className={styles.messageLine}>
          <div className={styles.messageSent}>
            <Typography.Text>Me</Typography.Text>
            <div className={styles.messageSentText}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageSent;
