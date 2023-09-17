import { IUser } from '@/model/User';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { AUTH_DETAIL, AUTH_LOGOUT } from './action';

export interface IInitAuth {
  loading: boolean;
  isLogin: boolean;
}

export const initialState: IInitAuth = {
  loading: false,
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AUTH_DETAIL.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AUTH_DETAIL.fulfilled, (state, action) => {
        state.isLogin = true;
        state.loading = false;
      })
      .addCase(AUTH_DETAIL.rejected, (state, action) => {
        state.isLogin = false;
        state.loading = false;
      })
      .addCase(AUTH_LOGOUT.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(AUTH_LOGOUT.fulfilled, (state, action) => {
        state.isLogin = false;
        state.loading = false;
      })
      .addCase(AUTH_LOGOUT.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
