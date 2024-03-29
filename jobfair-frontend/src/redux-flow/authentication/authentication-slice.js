import { createSlice } from '@reduxjs/toolkit';
import { USER_STORAGE } from '../../constants/AppConst';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    isAuthUser: !!localStorage.getItem(USER_STORAGE),
    user: JSON.parse(localStorage.getItem(USER_STORAGE)) || {},
    status: ''
  },
  reducers: {
    fetchingLogin: (state, action) => {
      state = {
        ...state,
        data: [],
        isFetching: true
      };
    },
    fetchingLoginSuccess: (state, action) => {
      return { ...state, isAuthUser: true, user: action.payload };
    },
    fetchingLoginFailure: (state, action) => {
      state = {
        ...state,
        isFetching: false,
        error: true,
        status: action.data.status
      };
    },
    logout: (state) => {
      return { ...state, isAuthUser: false, user: {} };
    },
    updateUserProfileImage: (state, action) => {
      return { ...state, user: { ...state.user, profileUrl: action.payload } };
    },
    updateUserFullName: (state, action) => {
      return { ...state, user: { ...state.user, fullName: action.payload } };
    }
  }
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
