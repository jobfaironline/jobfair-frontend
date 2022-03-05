import {configureStore} from '@reduxjs/toolkit'
import authenticationReducer from './authentication/authentication-slice'
import registrationJobfairFormReducer from './registration-jobfair-form/registration-jobfair-form-slice'
import jobPositionsReducer from './jobPositions/job-positions-slice'
import agoraReducer from './agora/agora-slice'
import decorateBoothReducer from './decorateBooth/decorate-booth-slice'

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        registrationJobfairForm: registrationJobfairFormReducer,
        jobPosition: jobPositionsReducer,
        agora: agoraReducer,
        decorateBooth: decorateBoothReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store
