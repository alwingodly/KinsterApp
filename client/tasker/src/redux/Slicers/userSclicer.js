import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  userData: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuth: (state, action) => {
      state.userID = action.payload?.tokens;
      state.userData = action.payload?.user
    },
  },
});

export const { userAuth } = userSlice.actions;

export default userSlice.reducer;
