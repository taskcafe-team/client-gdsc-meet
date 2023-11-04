import {
	AUTH_FETCH_EMAIL_LOGIN,
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	AUTH_FETCH_SUCESS,
	AUTH_LOGOUT,
} from './authConstants'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi } from 'api/http-rest'
import { userFetchMe } from 'contexts/user'
import { setLocalStorageItem } from 'utils/localStorageUtils'

// action
export const authLogout = createAction(AUTH_LOGOUT)
export const authFetchSucess = createAction(AUTH_FETCH_SUCESS)

// thunk action
export const authFetchEmailLogin = createAsyncThunk(
	AUTH_FETCH_EMAIL_LOGIN,
	async (request: { email: string; password: string }, { dispatch }) => {
		const res = await AuthApi.loginWithEmail(request)
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			setLocalStorageItem({
				key: `access_token`,
				value: res.data.accessToken,
			})
			dispatch(authFetchSucess())
			dispatch(userFetchMe())
		}
	}
)

export const authFetchGoogleLoginVerify = createAsyncThunk(
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	async (search: string, { dispatch }) => {
		const res = await AuthApi.googleAuthVerify(search)
		if (res.metadata.status === 200) {
			setLocalStorageItem({
				key: `access_token`,
				value: res.data.accessToken,
			})
			dispatch(userFetchMe())
			dispatch(authFetchSucess())
		}
	}
)
