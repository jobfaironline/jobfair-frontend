import { createSlice } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
  name: "resetpassword",
  initialState: {
    data: [],
    result: {},
    dataFetched: false,
    isFetching: false,
    error: false,
    status: "",
  },
  reducers: {
    fetchingGenerateOtp: (state, action) => {
      state = {
        ...state,
        data: [],
        isFetching: true,
      };
    },
    fetchingGenerateOtpSuccess: (state, action) => {
      return { ...state, result: action.payload };
    },
    fetchingGenerateOtpFailure: (state, action) => {
      state = {
        ...state,
        isFetching: false,
        error: true,
        status: action.data.status,
      };
    },

    fetchingResetPassword: (state, action) => {
      state = {
        ...state,
        data: [],
        isFetching: true,
      };
    },
    fetchingResetPasswordSuccess: (state, action) => {
      return { ...state, result: action.payload };
    },

    fetchingResetPasswordOtpFailure: (state, action) => {
      state = {
        ...state,
        isFetching: false,
        error: true,
        status: action.data.status,
      };
    },

  },
});

export const resetPasswordActions = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer; 