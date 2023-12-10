import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { userReducer } from './user'
import { meetingReducer } from './meeting'
import { keywordReducer } from './keywords'
import { noitificationKeywordReducer } from './notificationKeyword/notificationKeywordReducer'

export const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	meeting: meetingReducer,
	keyword:keywordReducer,
	noitificationKeyword:noitificationKeywordReducer
})

const rootMiddleware = getDefaultMiddleware({
	serializableCheck: false
  });

const store = configureStore({
	reducer: rootReducer,
	middleware:rootMiddleware,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
