import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authentication-slice'
import jobPositionsReducer from './jobPositions/job-positions-slice'
import agoraReducer from './agora/agora-slice'
import decorateBoothReducer from './decorateBooth/decorate-booth-slice'
import inventoryReducer from './inventory/inventory-slice'

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    jobPosition: jobPositionsReducer,
    agora: agoraReducer,
    decorateBooth: decorateBoothReducer,
    inventory: inventoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
