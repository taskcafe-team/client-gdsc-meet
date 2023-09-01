import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './users/auth/reducer'
// this is main root reducer 
export const rootReducer = combineReducers({
    auth:authSlice.reducer,
})