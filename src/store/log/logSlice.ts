import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllLogs } from './thunks';

interface LogState {
  logs: any[];
  isLoading: boolean;
  error: string | null; 
}

const initialState: LogState = {
  logs: [],
  isLoading: false,
  error: null
};

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLogs.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.logs = action.payload;
      })
      .addCase(fetchAllLogs.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else if (action.payload?.message) {
          state.error = action.payload.message;
        } else if (typeof action.payload === 'object') {
          state.error = JSON.stringify(action.payload);
        } else {
          state.error = 'Unknown error occurred';
        }
      });
  }
});

export default logSlice.reducer;
