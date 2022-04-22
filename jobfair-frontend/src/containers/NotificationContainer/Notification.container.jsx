import { NotificationComponent } from '../../components/customized-components/Notification/Notification.component';
import {
  getNotification,
  readAllNotification,
  readNotification
} from '../../services/jobhub-api/NotifcationControllerService';
import { notification } from 'antd';
import { notificationAction } from '../../redux-flow/notification/notification-slice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

export const NotificationContainer = () => {
  const notificationData = useSelector((state) => state.notification.data);
  const unreadNotification = notificationData.filter((notification) => !notification.read);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const onClick = async () => {
    try {
      const notificationData = (await getNotification()).data;
      dispatch(notificationAction.setData(notificationData));
      setIsVisible((prevState) => !prevState);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onRead = async (id) => {
    try {
      readNotification(id);
      dispatch(notificationAction.readNotification(id));
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onReadAll = () => {
    try {
      readAllNotification();
      dispatch(notificationAction.readAll());
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const props = { onClick, unreadNotification, isVisible, onReadAll, notificationData, onRead };

  return <NotificationComponent {...props} />;
};
