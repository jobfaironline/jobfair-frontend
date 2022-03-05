import { createSlice } from '@reduxjs/toolkit'
import { createDraftRegistration } from './registration-jobfair-form-action'

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
    },
    createDraftResult: [],
    companyInfo: {
      taxId: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      employeeMaxNum: 0,
      url: '',
      status: '',
      sizeId: 0,
      subCategoriesIds: [0],
      benefits: [
        {
          id: 0,
          description: ''
        }
      ],
      // "companyLogoURL": "https://d3polnwtp0nqe6.cloudfront.net/default.png",
      companyDescription: ''
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
    setFormBody: (state, action) => {
      state.form.body = {
        ...state.form.body,
        ...action.payload
      }
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
  },
  extraReducers: builder => {
    builder.addCase(createDraftRegistration.fulfilled, (state, action) => {
      return { ...state, createDraftResult: action.payload }
    })
  }
})

export const {
  setDraftId,
  setJobPositionModalVisibility,
  setJobPositionSubmodalVisibility,
  setJobPositions,
  resetForm,
  setFormJobFairRegistrationId,
  setFormDescription,
  setFormBody
} = registrationJobFairFormSlice.actions
export default registrationJobFairFormSlice.reducer
