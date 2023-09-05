import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/reducer'
import { meetSlice } from './meet'
import { userSlice } from './users'
// this is main root reducer 
export const rootReducer = combineReducers({
    auth:authSlice.reducer,
    meet:meetSlice.reducer,
    user:userSlice.reducer
})