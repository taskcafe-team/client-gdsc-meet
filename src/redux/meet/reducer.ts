
import { IUser } from '@/model/IUser';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { MEET_ADD, MEET_DELETE } from './action';
import { IRoom } from '@/model/IRoom';

export interface IInitMeet {
  loading: boolean,
  payload: null|IRoom,
}

export const initialState: IInitMeet = {
  loading: false,
  payload:null,
};

export const meetSlice = createSlice({
  name: 'meet',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(MEET_ADD.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(MEET_ADD.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload;
    })
    .addCase(MEET_ADD.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(MEET_DELETE.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(MEET_DELETE.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = null;
    })
    .addCase(MEET_DELETE.rejected, (state, action) => {
      state.loading = false;
    })
   ;
  },
});
