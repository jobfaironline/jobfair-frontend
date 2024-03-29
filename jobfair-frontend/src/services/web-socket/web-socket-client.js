import { NotificationType } from '../../constants/NotificationConstant';
import { mapperForNotification } from '../../utils/mapperForNotification';
import { notification } from 'antd';
import { notificationAction } from '../../redux-flow/notification/notification-slice';
import store from '../../redux-flow/index';

export class WebSocketClient {
  constructor(token) {
    this.token = token;
    this.socket = new WebSocket(`wss://4bzm5epi2c.execute-api.ap-southeast-1.amazonaws.com/fuckyou?token=${token}`);
    this.eventHandlers = {
      default: (data) => {
        let notificationData = JSON.parse(JSON.stringify(data));
        switch (notificationData?.notificationType) {
          case NotificationType.NOTI: {
            notificationData = mapperForNotification(notificationData);
            notification['success']({
              message: notificationData.title,
              description: notificationData.message,
              duration: 0,
              onClick: notificationData.action,
              className: notificationData.action ? 'notification-message-clickable' : ''
            });
            store.dispatch(notificationAction.addNotification(notificationData));
            break;
          }
        }
      }
    };
    this.setHandlers();
  }

  setHandlers() {
    const self = this;
    this.socket.onmessage = function (event) {
      const notificationData = JSON.parse(event.data);
      for (const handler of Object.values(self.eventHandlers)) handler(notificationData);
    };
  }

  addEvent(eventName, handler) {
    this.eventHandlers[eventName] = handler;
    this.setHandlers();
  }

  removeEvent(eventName) {
    Reflect.deleteProperty(this.eventHandlers, eventName);
    this.setHandlers();
  }

  close() {
    this.socket.close();
  }
}
