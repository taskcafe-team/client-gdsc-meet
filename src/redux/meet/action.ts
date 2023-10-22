import { RoomService } from '@/api/http-rest/room';
import { IRoom } from '@/model/IRoom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

export const MEET_ADD = createAsyncThunk('auth/MEET_ADD', async (payload: IRoom) => {
  // You can perform your logic here, such as making an API request
  const response = await RoomService.createRoom();
  return response.data;
});

export const MEET_DELETE = createAsyncThunk('auth/MEET_DELETE', async (payload: any) => {
  try {
    return payload;
  } catch (error) {
    // Handle errors and reject the promise if needed
    throw error;
  }
});
