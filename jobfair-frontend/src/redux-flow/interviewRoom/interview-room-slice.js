import { createSlice } from '@reduxjs/toolkit';

const interviewRoomSlice = createSlice({
  name: 'interviewRoom',
  initialState: {
    rerender: false
  },
  reducers: {
    setRerender: (state) => {
      //also reset it
      return {
        ...state,
        rerender: !state.rerender
      };
    }
  }
});

export const interviewRoomAction = interviewRoomSlice.actions;
export default interviewRoomSlice.reducer;
