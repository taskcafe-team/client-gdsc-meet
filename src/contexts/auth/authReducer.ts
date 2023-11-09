import { createSlice } from '@reduxjs/toolkit'
import { AuthDetailState } from './authTypes'
import {
	authFetching,
	authFetchSucess,
	authFetchEmailLogin,
	authLogout,
	authFetchError,
	authFetchEmailForgotPass,
} from './authActions'

const initialState: AuthDetailState = {
	isLogin: false,
	loading: false,
	error: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authFetching, (state) => {
				state.loading = true
			})
			.addCase(authFetchError, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(authLogout.fulfilled, (state) => {
				state.isLogin = false
				state.loading = false
				state.error = undefined
			})
			.addCase(authFetchSucess, (state) => {
				state.isLogin = true
				state.loading = false
				state.error = undefined
			})
			.addCase(authFetchEmailLogin.pending, (state) => {
				state.loading = true
			})
			.addCase(authFetchEmailLogin.fulfilled, (state) => {
				state.loading = false
				state.error = undefined
			})
			.addCase(authFetchEmailForgotPass.fulfilled, (state) => {
				state.loading = false
				state.error = undefined
			})
			.addCase(authFetchEmailForgotPass.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(authFetchEmailForgotPass.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as any
			})
	},
})

export const authReducer = authSlice.reducer
