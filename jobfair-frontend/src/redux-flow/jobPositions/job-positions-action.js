import { getJobPositionsAPI } from '../../services/jobhub-api/JobControllerService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobPositions = createAsyncThunk(
  'jobPositions/fetchJobPositions',
  async ({ currentPage, pageSize }) => {
    const res = await getJobPositionsAPI('DESC', currentPage, pageSize, 'createdDate');
    return res.data;
  }
);
