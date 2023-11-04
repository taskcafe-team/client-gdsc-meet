import { createSlice } from '@reduxjs/toolkit'
import { AuthDetailState } from './authTypes'
import { authLoginSuccess, authLogout } from './authActions'

const initialState: AuthDetailState = {
	isLogin: false,
	loading: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authLogout, (state) => {
				state.isLogin = false
				state.loading = false
				state.error = undefined
			})
			.addCase(authLoginSuccess, (state) => {
				state.isLogin = true
				state.loading = false
				state.error = undefined
			})
	},
})

export const authReducer = authSlice.reducer
