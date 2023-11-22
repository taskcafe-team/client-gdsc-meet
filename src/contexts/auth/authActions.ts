import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
	AUTH_FETCH_EMAIL_LOGIN,
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	AUTH_LOGGED,
	AUTH_LOGOUT,
} from './authConstants'
import { AuthApi } from 'api/http-rest'
import { userFetchMe } from 'contexts/user'
import {
	removeLocalStorageItem,
	setLocalStorageItem,
} from 'utils/localStorageUtils'

/*----------- Action -----------*/
export const authLogged = createAction(AUTH_LOGGED)

/*----------- Thunk Action -----------*/
export const authLogout = createAsyncThunk(AUTH_LOGOUT, async () => {
	removeLocalStorageItem('access_token')
})

export const authFetchEmailLogin = createAsyncThunk(
	AUTH_FETCH_EMAIL_LOGIN,
	async (request: { email: string; password: string }, { dispatch }) => {
		const res = await AuthApi.loginWithEmail(request)
		const { success } = res.metadata
		if (success) {
			const { accessToken } = res.data
			const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
			setLocalStorageItem(key, accessToken)
			dispatch(authLogged())
			console.log(key)
		}
		return res
	}
)

export const authFetchGoogleLoginVerify = createAsyncThunk(
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	async (search: string, { dispatch }) => {
		const res = await AuthApi.googleAuthVerify(search)
		const { success } = res.metadata
		if (success) {
			const { accessToken } = res.data
			const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
			setLocalStorageItem(key, accessToken)
			dispatch(authLogged())
			dispatch(userFetchMe())
		}
		return res
	}
)
