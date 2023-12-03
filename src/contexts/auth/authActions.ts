/* eslint-disable no-undef */
import {
	createAction,
	createAsyncThunk,
	isRejectedWithValue,
	isRejected,
} from '@reduxjs/toolkit'
import {
	AUTH_FETCH_EMAIL_LOGIN,
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	AUTH_LOGGED,
	AUTH_LOGOUT,
} from './authConstants'
import { userFetchMe } from 'contexts/user'
import {
	removeLocalStorageItem,
	setLocalStorageItem,
} from 'utils/localStorageUtils'
import AuthApi from 'api/http-rest/auth/authApi'

/*----------- Action -----------*/
export const authLogged = createAction(AUTH_LOGGED)

/*----------- Thunk Action -----------*/
export const authLogout = createAsyncThunk(AUTH_LOGOUT, async () => {
	const keyStore = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
	removeLocalStorageItem(keyStore)
})

export const authFetchEmailLogin = createAsyncThunk(
	AUTH_FETCH_EMAIL_LOGIN,
	(
		request: {
			email: string
			password: string
		},
		{ dispatch, rejectWithValue }
	) => {
		const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN

		return AuthApi.loginWithEmail(request)
			.then(({ data, metadata }) => {
				if (metadata.success) {
					const { accessToken } = data
					setLocalStorageItem(key, accessToken)
					dispatch(authLogged())
				} else {
					removeLocalStorageItem(key)
					throw isRejectedWithValue(metadata.message || 'An error occurred')
				}

				return { data, metadata }
			})
			.catch((err) => {
				if (!err.response) {
					throw err
				}

				// Using rejectWithValue to handle the rejected promise with a specific value
				return rejectWithValue(err.response.data)
			})
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
			dispatch(userFetchMe()) //TODO: remove to homepage
		}
		return res
	}
)
