import { notificationAction } from '../../redux-flow/notification/notification-slice';
import store from '../../redux-flow/index';

export class WebSocketClient {
  constructor(token) {
    this.token = token;
    this.socket = new WebSocket(`wss://d8jkn5uxre.execute-api.ap-southeast-1.amazonaws.com/production?token=${token}`);
    this.init();
  }

  init() {
    this.socket.onmessage = function (event) {
      const notificationData = JSON.parse(event.data);
      store.dispatch(notificationAction.addNotification(notificationData));
    };
  }

  close() {
    this.socket.close();
  }
}
