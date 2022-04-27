import './Notification.styles.scss';
import { Button, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { getDateDifferent } from '../../../utils/common';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export const NotificationComponent = (props) => {
  const { onClick, unreadNotification, isVisible, onReadAll, notificationData, onRead, dialogRef } = props;
  return (
    <div className={'notification'}>
      <div className={'icon-container'} onClick={onClick}>
        <FontAwesomeIcon className={'icon'} size={'xl'} icon={faBell} />
        <div className={'number'}>{unreadNotification.length}</div>
      </div>
      <div className={'dialog'} style={{ display: isVisible ? 'block' : 'none' }} ref={dialogRef}>
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={400}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}>
          <div className={'header'}>
            <div className={'title'}>Notification</div>
            <Button className={'noti-markAll'} onClick={onReadAll}>
              Mark all as read
            </Button>
          </div>
          <List
            dataSource={notificationData}
            renderItem={(item) => (
              <div className={'content-container'}>
                <div className={'content'}>
                  <div className={'title'}>{item.title}</div>
                  <div className={'message'}>{item.message}</div>
                </div>
                <div className={'time'}>{getDateDifferent(item.createDate)}</div>
                <div className={'is-read'}>
                  <div
                    className={'check-mark'}
                    style={{ backgroundColor: item.read ? '#C8E0F0' : '#009AFF' }}
                    onClick={() => onRead(item.id)}
                  />
                </div>
              </div>
            )}
          />
        </Scrollbars>
      </div>
    </div>
  );
};
