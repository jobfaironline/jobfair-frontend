import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authentication-slice'
import agoraReducer from './agora/agora-slice'
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    agora: agoraReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})
export default store
