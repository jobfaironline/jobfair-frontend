import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authentication-slice'
import registrationJobfairFormReducer from './registration-jobfair-form/registration-jobfair-form-slice'
import jobPositionsReducer from './jobPositions/job-positions-slice'

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registrationJobfairForm: registrationJobfairFormReducer,
    jobPosition: jobPositionsReducer
  }
})
export default store
