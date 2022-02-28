import { createSlice } from '@reduxjs/toolkit'
import { fetchJobPositions } from './job-positions-action'

const jobPositionsSlice = createSlice({
  name: 'jobPositions',
  initialState: {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchJobPositions.fulfilled, (state, action) => {
      state.data = action.payload.map(item => {
        return {
          key: item.id,
          ...item
        }
      })
    })
  }
})

export const { fetchingJobPositions, fetchingJobPositionsSuccess, fetchingJobPositionsFailure } =
  jobPositionsSlice.actions
export default jobPositionsSlice.reducer
