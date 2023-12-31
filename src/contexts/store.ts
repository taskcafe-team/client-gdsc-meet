import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { userReducer } from './user'
import { meetingReducer } from './meeting'

export const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	meeting: meetingReducer,
})

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
