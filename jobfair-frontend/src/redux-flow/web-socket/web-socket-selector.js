import {WebSocketClient} from "../../services/web-socket/web-socket-client";
import {webSocketAction} from "./web-socket-slice";
import store from "../index";

export const selectWebSocket = (state) => {
  const webSocket = state.webSocket;
  const {authentication} = store.getState();
  if (!webSocket?.client) {
    if (authentication.isAuthUser) {
      const token = authentication.user.token;
      const client = new WebSocketClient(token);
      store.dispatch(webSocketAction.setWebSocketClient(client))
      return client;
    }
    return;
  }
  if (authentication.isAuthUser){
    return webSocket.client;
  } else {
    webSocket.client.close();
    store.dispatch(webSocketAction.setWebSocketClient(undefined))
  }
}