import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    hasFeedback: false
  },
  reducers: {
    setFeedBack: (state, action) => {
      state.hasFeedback = action.payload;
    }
  }
});
export const feedbackAction = feedbackSlice.actions;

export default feedbackSlice.reducer;
