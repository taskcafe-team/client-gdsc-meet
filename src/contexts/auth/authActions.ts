import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
	AUTH_FETCHING,
	AUTH_FETCH_EMAIL_LOGIN,
	AUTH_FETCH_ERROR,
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	AUTH_FETCH_SUCESS,
	AUTH_LOGOUT,
} from './authConstants'
import { AuthApi } from 'api/http-rest'
import { userFetchMe } from 'contexts/user'
import { removeLocalStorageItem, setLocalStorageItem } from 'utils/localStorageUtils'
import { AuthFetchError } from './authTypes'

/*----------- Action -----------*/
export const authFetching = createAction(AUTH_FETCHING)
export const authFetchError =
	createAction<AuthFetchError['payload']>(AUTH_FETCH_ERROR)
export const authFetchSucess = createAction(AUTH_FETCH_SUCESS)


/*----------- Thunk Action -----------*/
export const authLogout = createAsyncThunk(
	AUTH_LOGOUT,
	async()=>{
		removeLocalStorageItem('access_token')	
	}
)

export const authFetchEmailLogin = createAsyncThunk(
	AUTH_FETCH_EMAIL_LOGIN,
	async (request: { email: string; password: string }, { dispatch }) => {
		dispatch(authFetching())
		const res = await AuthApi.loginWithEmail(request)
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			setLocalStorageItem({
				key: `access_token`,
				value: res.data.accessToken,
			})
			dispatch(authFetchSucess())
			dispatch(userFetchMe())
		} else {
			const message = res.metadata.message || 'Something went wrong!'
			const code = res.metadata.message || 'Nan'
			dispatch(authFetchError({ message, code }))
		}
	}
)

export const authFetchGoogleLoginVerify = createAsyncThunk(
	AUTH_FETCH_GOOGLE_LOGIN_VERIFY,
	async (search: string, { dispatch }) => {
		dispatch(authFetching())
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
