import { authenticationActions } from './authentication-slice';
import * as cookie from 'js-cookie';

import { TOKEN_KEY, USER_STORAGE } from '../../constants/AppConst';
import {webSocketAction} from "../web-socket/web-socket-slice";
import {notificationAction} from "../notification/notification-slice";
import {WebSocketClient} from "../../services/web-socket/web-socket-client";

export const SigninHandler = (data) => {
  return (dispatch) => {
    cookie.set(TOKEN_KEY, data.token);
    localStorage.setItem(USER_STORAGE, JSON.stringify(data));
    const webSocketClient = new WebSocketClient(data.token);
    dispatch(webSocketAction.setWebSocketClient(webSocketClient));
    dispatch(authenticationActions.fetchingLoginSuccess(data));

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
