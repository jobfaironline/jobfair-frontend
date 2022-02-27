import { createSlice } from '@reduxjs/toolkit'

const registrationJobFairFormSlice = createSlice({
  name: 'registrationJobfairForm',
  initialState: {
    jobPositionModalVisibility: false,
    jobPositionSubmodalVisibility: false,
    form: {
      draftId: null,
      body: {
        description: null,
        jobFairRegistrationId: null,
        jobPositions: []
      }
    }
  },
  reducers: {
    // fetchingLogin: (state, action) => {
    //   state = {
    //     ...state,
    //     data: [],
    //     isFetching: true
    //   }
    // },
    // fetchingLoginSuccess: (state, action) => {
    //   return { ...state, isAuthUser: true, user: action.payload }
    // },
    // fetchingLoginFailure: (state, action) => {
    //   state = {
    //     ...state,
    //     isFetching: false,
    //     error: true,
    //     status: action.data.status
    //   }
    // },
    setFormDescription: (state, action) => {
      state.form.body.description = action.payload
    },
    setFormJobFairRegistrationId: (state, action) => {
      state.form.body.jobFairRegistrationId = action.payload
    },
    setDraftId: (state, action) => {
      state = {
        ...state,
        form: {
          ...state.form,
          draftId
        }
      }
    },
    setJobPositionSubmodalVisibility: (state, action) => {
      return { ...state, jobPositionSubmodalVisibility: action.payload }
    },
    setJobPositionModalVisibility: (state, action) => {
      return { ...state, jobPositionModalVisibility: action.payload }
    },
    setJobPositions: (state, action) => {
      state.form.body.jobPositions = action.payload
    },
    resetForm: (state, action) => {
      state = {
        jobPositionModalVisibility: false,
        jobPositionSubmodalVisibility: false,
        form: {
          draftId: null,
          body: {
            description: null,
            jobFairRegistrationId: null,
            jobPositions: []
          }
        }
      }
    }
  }
})

export const {
  setFormBody,
  setDraftId,
  setJobPositionModalVisibility,
  setJobPositionSubmodalVisibility,
  setJobPositions
} = registrationJobFairFormSlice.actions
export default registrationJobFairFormSlice.reducer
