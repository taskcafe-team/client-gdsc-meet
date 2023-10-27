import { createSlice } from "@reduxjs/toolkit";
import { AuthDetailState } from "./authTypes";
import {
  authDetailData,
  authDetailError,
  authDetailFetch,
  authLogout,
} from "./authActions";

const initialState: AuthDetailState = {
  payload: {
    isLogin: false,
  },
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authDetailFetch, (state) => {
        state.payload.isLogin = true;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(authDetailData, (state, action) => {
        state.payload = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(authDetailError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authLogout, (state) => {
        state.payload = { isLogin: false };
        state.loading = false;
        state.error = undefined;
      });
  },
});

export const authReducer = authSlice.reducer;
