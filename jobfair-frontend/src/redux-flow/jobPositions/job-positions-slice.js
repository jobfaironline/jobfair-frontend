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
      state.totalRecord = action.payload.totalElements
      state.number = action.payload.number
      state.data = action.payload.content.map((item, index) => {
        return {
          key: item.id,
          no: index + action.payload.number * 10 + 1,
          ...item
        }
      })
    })
  }
})

export const { fetchingJobPositions, fetchingJobPositionsSuccess, fetchingJobPositionsFailure } =
  jobPositionsSlice.actions
export default jobPositionsSlice.reducer
