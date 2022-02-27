import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authentication-slice'
import registrationJobfairFormReducer from './registration-jobfair-form/registration-jobfair-form-slice'
import jobPositionsReducer from './jobPositions/job-positions-slice'
import agoraReducer from './agora/agora-slice'

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registrationJobfairForm: registrationJobfairFormReducer,
    jobPosition: jobPositionsReducer
  }
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store
