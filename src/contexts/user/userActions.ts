import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserInfo } from './userTypes'
import UserApi, { RequestUpdateMe } from 'api/http-rest/userApi'
import { authFetchSucess } from 'contexts/auth'
import { USER_FETCH_ME, USER_FETCH_UPDATE_ME } from './userConstants'

// interface of action
export interface UserFetchMe {
	type: string
	payload: UserInfo
}

export interface FetchUpdateCurrentUser {
	type: string
}

// thunk action

export const userFetchMe = createAsyncThunk<UserFetchMe['payload']>(
	USER_FETCH_ME,
	async (arg, { dispatch }) => {
		const res = await UserApi.getMe()
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(authFetchSucess())
			return res.data as UserInfo
		} else throw new Error('Error')
	}
)

export const userFetchUpdateMe = createAsyncThunk(
	USER_FETCH_UPDATE_ME,
	async (request: RequestUpdateMe, { dispatch }) => {
		const res = await UserApi.updateMe(request)
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(userFetchMe())
		}
	}
)
