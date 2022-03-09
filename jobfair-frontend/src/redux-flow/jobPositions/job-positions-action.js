import { getJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchJobPositions = createAsyncThunk('jobPositions/fetchJobPositions', async () => {
  const res = await getJobPositionsAPI('ASC', 0, 10, 'title')
  return res.data
})
