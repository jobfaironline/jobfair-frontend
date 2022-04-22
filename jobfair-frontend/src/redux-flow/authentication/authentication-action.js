import { authenticationActions } from './authentication-slice';
import * as cookie from 'js-cookie';

import { TOKEN_KEY, USER_STORAGE } from '../../constants/AppConst';
import { webSocketAction } from '../web-socket/web-socket-slice';
import { notificationAction } from '../notification/notification-slice';
import { WebSocketClient } from '../../services/web-socket/web-socket-client';
import { getNotification } from '../../services/jobhub-api/NotifcationControllerService';
import { notification } from 'antd';

export const SigninHandler = (data) => {
  return async (dispatch) => {
    cookie.set(TOKEN_KEY, data.token);
    localStorage.setItem(USER_STORAGE, JSON.stringify(data));
    const webSocketClient = new WebSocketClient(data.token);
    dispatch(webSocketAction.setWebSocketClient(webSocketClient));
    dispatch(authenticationActions.fetchingLoginSuccess(data));
    try {
      const notificationData = (await getNotification()).data;
      dispatch(notificationAction.setData(notificationData));
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    cookie.remove(TOKEN_KEY);
    dispatch(webSocketAction.setWebSocketClient(undefined));
    dispatch(notificationAction.setData([]));
    localStorage.removeItem(USER_STORAGE);
    dispatch(authenticationActions.logout());
  };
};
