import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetAllLog } from '../../api/log-provider';

interface FetchAllLogsArgs {
  page: number;
  limit: number;
}

export const fetchAllLogs = createAsyncThunk(
  'logs/fetchAll',
  async ({ page, limit }: FetchAllLogsArgs, { rejectWithValue }) => {
    try {
      const response = await apiGetAllLog(page, limit);
      if (response.status) {
        return response.data;  
      } else {
      
        return rejectWithValue(response.message || 'Unknown error occurred while fetching logs');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);
