import { createSlice } from '@reduxjs/toolkit';

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
      state.data.push(action.payload)
    }
  }
});
export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
