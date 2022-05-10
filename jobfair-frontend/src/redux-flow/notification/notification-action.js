import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNotification } from '../../services/jobhub-api/NotifcationControllerService';

export const fetchNotification = createAsyncThunk('notification/fetchNotification', async () => {
  const res = await getNotification();
  return res.data;
});
