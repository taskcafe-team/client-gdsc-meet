import { AuthService } from "@/api/http-rest/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to simulate signing in
export const AUTH_DETAIL = createAsyncThunk(
    'auth/AUTH_DETAIL',
    async ({ username, password }: { username: string; password: string }) => {
      try {
        // Assuming you get an access token and refresh token from the response
  
        const User = await AuthService.login({
          username: username,
          password: password,
        });
        console.log(User);
        if(User){
          const { id, accessToken } = User;
          console.log(accessToken,id);
          localStorage.setItem('meet:accessToken', accessToken);
          return User;
        }else{
          throw new Error("Authentication failed");
        }
        // Return the user data and tokens
      } catch (error) {
        // Handle errors and reject the promise if needed
        throw error;
      }
    },
  );

export const AUTH_LOGOUT = createAsyncThunk(
    'auth/AUTH_LOGOUT',
    async () => {
        try {
              localStorage.removeItem('meet:accessToken');
            // Return the user data and tokens
          } catch (error) {
            // Handle errors and reject the promise if needed
            throw error;
          }
    }
  );