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
      if (!action.payload.content) state.data = []
      state.data = action.payload.content.map(item => {
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
