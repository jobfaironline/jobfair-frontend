import {createSlice} from '@reduxjs/toolkit';

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState: {
    client: undefined
  },
  reducers: {
    setWebSocketClient: (state, action) => {
      state.client = action.payload;
    }
  }
});
export const webSocketAction = webSocketSlice.actions;

export default webSocketSlice.reducer;
