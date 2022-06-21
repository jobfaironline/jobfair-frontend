import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authentication-slice';
import jobPositionsReducer from './jobPositions/job-positions-slice';
import agoraReducer from './agora/agora-slice';
import decorateBoothReducer from './decorateBooth/decorate-booth-slice';
import inventoryReducer from './inventory/inventory-slice';
import webSocketReducer from './web-socket/web-socket-slice';
import notificationReducer from './notification/notification-slice';
import boothTabReducer from './boothInfoTab/boothInfoTab-slice';
import feedbackReducer from './feedback/feedback-slice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    jobPosition: jobPositionsReducer,
    agora: agoraReducer,
    decorateBooth: decorateBoothReducer,
    inventory: inventoryReducer,
    webSocket: webSocketReducer,
    notification: notificationReducer,
    boothTab: boothTabReducer,
    feedback: feedbackReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
