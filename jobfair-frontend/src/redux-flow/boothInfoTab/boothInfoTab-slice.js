import { createSlice } from '@reduxjs/toolkit';

const boothTabSlice = createSlice({
  name: 'boothTab',
  initialState: {
    activeKey: 0
  },
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    }
  }
});

export const boothTabAction = boothTabSlice.actions;
export default boothTabSlice.reducer;
