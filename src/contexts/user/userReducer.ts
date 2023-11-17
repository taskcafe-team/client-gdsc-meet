import { createSlice } from '@reduxjs/toolkit'
import { UserInfoState } from './userTypes'
import { UserRole } from 'api/http-rest/user/userApi'
import { userFetchMe, userSetMe } from './userActions'

const initialState: UserInfoState = {
	id: '',
	avatar: null,
	email: '',
	firstName: null,
	lastName: null,
	role: UserRole.USER,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userSetMe, (state, action) => {
			state.id = action.payload.id
			state.avatar = action.payload.avatar
			state.email = action.payload.email
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.role = action.payload.role as UserRole
		})
	},
})

export const userReducer = userSlice.reducer
