import { createSlice } from "@reduxjs/toolkit";

const chooseSubscriptionSlice = createSlice({
  name: "chooseSubscription",
  initialState: {
    subscriptionItem: {},
    jobFairId: ""
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
    },
    saveJobFairId: (state, action) => {
      return {
        ...state,
        jobFairId: action.payload
      };
    }
  }
});

export const chooseSubscriptionAction = chooseSubscriptionSlice.actions;
export default chooseSubscriptionSlice.reducer;