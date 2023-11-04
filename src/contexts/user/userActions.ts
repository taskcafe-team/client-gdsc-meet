import { FETCH_CURRENT_USER, FETCH_UPDATE_CURRENT_USER } from './userConstants'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserInfo } from './userTypes'
import UserApi, { RequestUpdateMe } from 'api/http-rest/userApi'
import { authLoginSuccess } from 'contexts/auth'

// interface of action
export interface FetchCurrentUser {
	type: typeof FETCH_CURRENT_USER
	payload: UserInfo
}

export interface FetchUpdateCurrentUser {
	type: typeof FETCH_UPDATE_CURRENT_USER
}

// thunk action
export const fetchCurrentUser = createAsyncThunk<FetchCurrentUser['payload']>(
	FETCH_CURRENT_USER,
	async (arg, { dispatch }) => {
		const res = await UserApi.getMe()
		const { status } = res.metadata
		if (`${status}` == '200') {
			dispatch(authLoginSuccess())
			return res.data as UserInfo
		} else throw new Error('Error')
	}
)

export const fetchUpdateCurrentUser = createAsyncThunk(
	FETCH_UPDATE_CURRENT_USER,
	async (request: RequestUpdateMe, { dispatch }) => {
		const res = await UserApi.updateMe(request)
		console.log(res)
		dispatch(fetchCurrentUser())
	}
)
