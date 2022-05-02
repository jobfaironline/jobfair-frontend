import { createSlice } from '@reduxjs/toolkit';
import { fetchNotification } from './notification-action';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addNotification: (state, action) => {
      state.data.push(action.payload);
    },
    readNotification: (state, action) => {
      const id = action.payload;
      const notification = state.data.find((noti) => noti.id === id);
      if (notification) {
        notification.read = true;
      }
    },
    readAll: (state) => {
      state.data.forEach((noti) => (noti.read = true));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});
export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
