import { getJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchJobPositions = createAsyncThunk('jobPositions/fetchJobPositions', async () => {
  const res = await getJobPositionsAPI()
  return res.data
})
