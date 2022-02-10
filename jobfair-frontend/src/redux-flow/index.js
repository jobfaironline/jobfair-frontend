import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication-slice";
import resetPasswordReducer from "./reset-password/reset-password-slice";
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    resetpassword: resetPasswordReducer,
  },
});
export default store;
