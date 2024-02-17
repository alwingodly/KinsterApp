import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminID: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminAuth: (state, action) => {
      state.adminID = action.payload;
    },
  },
});

export const { adminAuth } = adminSlice.actions;

export default adminSlice.reducer;
