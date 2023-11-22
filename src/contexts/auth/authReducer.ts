import { createSlice } from '@reduxjs/toolkit'
import { AuthDetailState } from './authTypes'
import { authLogged, authLogout } from './authActions'

const initialState: AuthDetailState = {
	isLogin: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authLogged, (state) => {
				state.isLogin = true
			})
			.addCase(authLogout.fulfilled, (state) => {
				state.isLogin = false
			})
			.addCase(authLogout.rejected, (state) => {
				state.isLogin = false
			})
	},
})

export const authReducer = authSlice.reducer
