import { createSlice } from '@reduxjs/toolkit';

const boothTabSlice = createSlice({
  name: 'boothTab',
  initialState: {
    activeKey: undefined,
    isShow: false
  },
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setIsShow: (state, action) => {
      state.isShow = action.payload;
    }
  }
});

export const boothTabAction = boothTabSlice.actions;
export default boothTabSlice.reducer;
