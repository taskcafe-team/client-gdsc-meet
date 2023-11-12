import { createSlice } from '@reduxjs/toolkit'
import { UserInfoState } from './userTypes'
import { UserRole } from 'api/http-rest/user/userApi'
import { userFetchMe } from './userActions'

const initialState: UserInfoState = {
	id: '',
	avatar: null,
	email: '',
	firstName: null,
	lastName: null,
	role: UserRole.USER,
	loading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userFetchMe.pending, (state) => {
				state.loading = true
			})
			.addCase(userFetchMe.fulfilled, (state, action) => {
				state.id = action.payload.id
				state.avatar = action.payload.avatar
				state.email = action.payload.email
				state.firstName = action.payload.firstName
				state.lastName = action.payload.lastName
				state.role = action.payload.role as UserRole
				state.loading = false
			})
			.addCase(userFetchMe.rejected, (state) => {
				state.loading = false
			})
	},
})

export const userReducer = userSlice.reducer
