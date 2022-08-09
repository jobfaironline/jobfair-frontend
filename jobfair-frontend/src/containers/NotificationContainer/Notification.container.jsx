import { NotificationComponent } from '../../components/customized-components/Notification/Notification.component';
import { fetchNotification } from '../../redux-flow/notification/notification-action';
import {
  getNotification,
  readAllNotification,
  readNotification
} from '../../services/jobhub-api/NotifcationControllerService';
import { mapperForNotification } from '../../utils/mapperForNotification';
import { notification } from 'antd';
import { notificationAction } from '../../redux-flow/notification/notification-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import React, { useLayoutEffect, useRef, useState } from 'react';

export const NotificationContainer = () => {
  const notificationData = useSelector((state) => state.notification.data);
  const unreadNotification = notificationData.filter((notification) => !notification?.read);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef();

  useLayoutEffect(() => {
    dispatch(fetchNotification());
  }, []);

  const onClick = async () => {
    try {
      let notificationData = (await getNotification()).data;
      notificationData = notificationData.map((notification) => mapperForNotification(notification));

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

  useOnClickOutside(dialogRef, () => {
    setIsVisible(false);
  });

  const props = { onClick, unreadNotification, isVisible, onReadAll, notificationData, onRead, dialogRef };

  return <NotificationComponent {...props} />;
};
