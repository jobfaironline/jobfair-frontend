import { getJobPositionsAPI } from '../../services/jobhub-api/JobControllerService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobPositions = createAsyncThunk(
  'jobPositions/fetchJobPositions',
  async ({ currentPage, pageSize, jobTitle }) => {
    const res = await getJobPositionsAPI('DESC', currentPage, pageSize, 'createdDate', jobTitle);
    return res.data;
  }
);
