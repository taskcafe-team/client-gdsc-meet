import { IMeet } from "@/model/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const MEET_ADD = createAsyncThunk(
    'auth/MEET_ADD',
    async (payload:IMeet) => {
      try {
        // logic code is here
        return payload;
      } catch (error) {
        // Handle errors and reject the promise if needed
        throw error;
      }
    },
  );

  export const MEET_DELETE = createAsyncThunk(
    'auth/MEET_DELETE',
    async (payload:any) => {
      try {
        
        return payload;
      } catch (error) {
        // Handle errors and reject the promise if needed
        throw error;
      }
    },
  );