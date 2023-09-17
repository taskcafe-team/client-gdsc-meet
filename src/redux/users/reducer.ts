import { IUser } from '@/model/User';
import { createSlice } from '@reduxjs/toolkit';
import { USER_DETAIL } from './action';

export interface IInitUser {
  payload: IUser | null;
  loading: boolean;
}

export const initialState: IInitUser = {
  loading: false,
  payload: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(USER_DETAIL.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(USER_DETAIL.fulfilled, (state, action) => {
      state.loading = true;
      state.payload = action.payload
    })
    .addCase(USER_DETAIL.rejected, (state, action) => {
      state.loading = false;
    });;
  },
});
