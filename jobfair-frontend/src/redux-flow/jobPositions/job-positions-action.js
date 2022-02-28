import { getJobPositionsAPI } from '../../services/registrationJobFairService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchJobPositions = createAsyncThunk('jobPositions/fetchJobPositions', async () => {
  const res = await getJobPositionsAPI()
  return res.data
})
