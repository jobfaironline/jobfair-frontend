import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApplicationById } from '../../services/jobhub-api/ApplicationControllerService';

export const fetchInterviewingApplicationData = createAsyncThunk(
  'interviewRoom/fetchInterviewingApplicationData',
  async ({ applicationId }) => {
    const res = await getApplicationById(applicationId);
    return res.data;
  }
);
