import { NotificationType } from '../../constants/NotificationType';
import { notification } from 'antd';
import { notificationAction } from '../../redux-flow/notification/notification-slice';
import store from '../../redux-flow/index';

export class WebSocketClient {
  constructor(token) {
    this.token = token;
    this.socket = new WebSocket(`wss://d8jkn5uxre.execute-api.ap-southeast-1.amazonaws.com/production?token=${token}`);
    this.eventHandlers = {
      default: (notificationData) => {
        switch (notificationData?.notificationType) {
          case NotificationType.NOTI: {
            notification['success']({
              message: notificationData.title,
              description: notificationData.message,
              duration: 2
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
