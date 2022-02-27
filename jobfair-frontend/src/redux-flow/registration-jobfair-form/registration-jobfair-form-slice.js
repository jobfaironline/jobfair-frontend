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
      return {
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
  setDraftId,
  setJobPositionModalVisibility,
  setJobPositionSubmodalVisibility,
  setJobPositions,
  resetForm,
  setFormJobFairRegistrationId,
  setFormDescription
} = registrationJobFairFormSlice.actions
export default registrationJobFairFormSlice.reducer
