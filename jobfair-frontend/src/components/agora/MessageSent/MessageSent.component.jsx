import { useEffect } from 'react';
import styles from './MessageSent.module.scss';

const MessageSent = (prop) => {
  const { message } = prop;
  // eslint-disable-next-line no-console
  useEffect(() => console.log(message), [prop]);
  return (
    <div className={styles.message}>
      <div className={styles.personalMessage}>
        <div className={styles.messageLine}>
          <div className={styles.messageSent}>
            <div className={styles.messageSentText}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageSent;
