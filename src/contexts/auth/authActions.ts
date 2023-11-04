import { CommonError } from '../types'
import { IAuth } from './authTypes'
import {
	AUTH_DETAIL_FETCH,
	AUTH_DETAIL_DATA,
	AUTH_DETAIL_ERROR,
	AUTH_LOGOUT,
	AUTH_SUCESS,
	AUTH_LOGIN_SUCESS,
	FETCH_AUTH_GOOGLE_LOGIN,
	FETCH_AUTH_LOGIN,
} from './authConstants'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from 'api/http-rest'
import { setLocalStorageItem } from 'utils/localStorageUtils'
import { fetchCurrentUser } from 'contexts/user'

// interface of action
export interface AuthDetailFetch {
	type: typeof AUTH_DETAIL_FETCH
}

export interface AuthDetailData {
	type: typeof AUTH_DETAIL_DATA
	payload: IAuth
}

export interface AuthDetailError {
	type: typeof AUTH_DETAIL_ERROR
	payload: CommonError
}

export interface AuthLogout {
	type: typeof AUTH_LOGOUT
}

export interface AuthSuccess {
	type: typeof AUTH_SUCESS
}

export interface AuthLoginSuccess {
	type: typeof AUTH_LOGIN_SUCESS
}

// action
export const authLogout = createAction<undefined>(AUTH_LOGOUT)
export const authLoginSuccess = createAction(AUTH_LOGIN_SUCESS)

// thunk action
export const fetchAuthLoginEmail = createAsyncThunk(
	FETCH_AUTH_LOGIN,
	async (body: { email: string; password: string }, { dispatch }) => {
		const res = await AuthApi.loginWithEmail(body)
		if (res.metadata.status === 200) {
			setLocalStorageItem({
				key: `access_token`,
				value: res.data.accessToken,
			})
			dispatch(authLoginSuccess())
			dispatch(fetchCurrentUser())
		}
	}
)

export const fetchAuthGoogleLoginVerify = createAsyncThunk(
	FETCH_AUTH_GOOGLE_LOGIN,
	async (search: string, { dispatch }) => {
		const res = await AuthApi.googleAuthVerify(search)
		console.log(res)
		if (res.metadata.status === 200) {
			setLocalStorageItem({
				key: `access_token`,
				value: res.data.accessToken,
			})
			dispatch(fetchCurrentUser())
			dispatch(authLoginSuccess())
		}
	}
)
