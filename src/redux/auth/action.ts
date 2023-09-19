import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to simulate signing in
export const AUTH_DETAIL = createAsyncThunk(
  'auth/AUTH_DETAIL',
  async ({ accessTokent,refreshToken }: { accessTokent: string ,refreshToken:string}) => {
    try {
      // Assuming you get an access token and refresh token from the response
      localStorage.setItem('meet:accessToken', JSON.stringify(accessTokent));
      localStorage.setItem('meet:refreshToken', JSON.stringify(refreshToken));
      return accessTokent;
      // Return the user data and tokens
    } catch (error) {
      // Handle errors and reject the promise if needed
      throw error;
    }
  },
);

export const AUTH_RELOGIN = createAsyncThunk(
  'auth/AUTH_RELOGIN',
  async () => {
    try {
      // Assuming you get an access token and refresh token from the response
      // Return the user data and tokens
    } catch (error) {
      // Handle errors and reject the promise if needed
      throw error;
    }
  },
);

export const AUTH_LOGOUT = createAsyncThunk('auth/AUTH_LOGOUT', async () => {
  try {
    localStorage.removeItem('meet:accessToken');
    // Return the user data and tokens
  } catch (error) {
    // Handle errors and reject the promise if needed
    throw error;
  }
});
