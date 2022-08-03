import { createSlice } from "@reduxjs/toolkit";

const chooseSubscriptionSlice = createSlice({
  name: "chooseSubscription",
  initialState: {
    subscriptionItem: {}
  },
  reducers: {
    setSubscriptionItem: (state, action) => {
      return {
        ...state,
        subscriptionItem: action.payload
      };
    },
    clearSubscriptionItem: (state, action) => {
      return {
        ...state,
        subscriptionItem: {}
      };
    }
  }
});

export const chooseSubscriptionAction = chooseSubscriptionSlice.actions;
export default chooseSubscriptionSlice.reducer;