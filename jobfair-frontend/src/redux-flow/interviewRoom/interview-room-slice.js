import { createSlice } from '@reduxjs/toolkit';
import { fetchInterviewingApplicationData } from './interview-room-action';

const interviewRoomSlice = createSlice({
  name: 'interviewRoom',
  initialState: {
    rerender: false,
    currentInterviewingApplication: {
      applicationData: undefined,
      invitingApplicationId: undefined
    }
  },
  reducers: {
    setRerender: (state) => {
      //also reset it
      return {
        ...state,
        rerender: !state.rerender
      };
    },
    setCurrentInterviewingApplicationId: (state, action) => {
      return {
        ...state,
        currentInterviewingApplication: {
          ...state.currentInterviewingApplication,
          invitingApplicationId: action.payload
        }
      };
    },
    resetCurrentInterviewingApplication: (state) => {
      return {
        ...state,
        currentInterviewingApplication: {
          applicationData: undefined,
          invitingApplicationId: undefined
        }
      };
    },
    resetApplicationData: (state) => {
      return {
        ...state,
        currentInterviewingApplication: {
          ...state.currentInterviewingApplication,
          applicationData: undefined
        }
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInterviewingApplicationData.fulfilled, (state, action) => {
      state.currentInterviewingApplication = {
        ...state.currentInterviewingApplication,
        applicationData: action.payload
      };
    });
    builder.addCase(fetchInterviewingApplicationData.rejected, (state, action) => {
      state.currentInterviewingApplication = {
        ...state.currentInterviewingApplication,
        applicationData: undefined
      };
    });
  }
});

export const interviewRoomAction = interviewRoomSlice.actions;
export default interviewRoomSlice.reducer;
