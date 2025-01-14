// src/store/slices/classSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ClassState {
  selectedClass: any;
}

const initialState: ClassState = {
  selectedClass: null,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    selectClass(state, action) {
      state.selectedClass = action.payload;
    },
  },
});

export const { selectClass } = classSlice.actions;
export default classSlice.reducer;