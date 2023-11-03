import { createSlice } from '@reduxjs/toolkit'
import { userDetailData } from './userActions'
import { UserInfoState } from './userTypes'
import { UserRole } from 'api/http-rest/userApi'

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
		builder.addCase(userDetailData, (state, action) => {
			return Object.assign(state, action.payload)
		})
	},
})

export const userReducer = userSlice.reducer
