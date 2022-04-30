import {WebSocketClient} from "../../services/web-socket/web-socket-client";
import {webSocketAction} from "./web-socket-slice";
import store from "../index";

export const selectWebSocket = (state) => {
  debugger
  const webSocket = state.webSocket;
  if (!webSocket?.client) {
    const {authentication} = store.getState();
    if (authentication.isAuthUser) {
      const token = authentication.user.token;
      const client = new WebSocketClient(token);
      store.dispatch(webSocketAction.setWebSocketClient(client))
      return client;
    }
  }
  return webSocket.client;
}