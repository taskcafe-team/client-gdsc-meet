import { IUser } from '@/model/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to simulate signing in
export const USER_DETAIL = createAsyncThunk('auth/AUTH_DETAIL', async (payload: IUser) => {
  try {
    return payload;
  } catch (error) {
    // Handle errors and reject the promise if needed
    throw error;
  }
});
