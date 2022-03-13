import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createDraftRegistrationAPI,
  submitRegistrationAPI
} from '../../services/company-registration-controller/CompanyRegistrationControllerService'

export const createDraftRegistration = createAsyncThunk(
  'registrationJobfairForm/createDraftRegistration',
  async body => {
    const res = await createDraftRegistrationAPI(body)
    const response = await submitRegistrationAPI(res.data.companyRegistrationId)
    return response
  }
)
