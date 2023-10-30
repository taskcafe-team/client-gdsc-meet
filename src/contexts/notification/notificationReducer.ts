import { createSlice } from '@reduxjs/toolkit'
import { NoitificationState } from './notificationTypes'
import { noitificationSet, noitificationClear } from './notificationActions'

const initialState: NoitificationState = {
	message: '',
	code: undefined,
	timestamp: undefined,
}

const noitificationSlice = createSlice({
	name: 'noitification',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(noitificationSet, (state, action) => {
				state.message = action.payload.message
				state.code = action.payload.code
				state.timestamp = action.payload.timestamp || new Date().getTime()
			})
			.addCase(noitificationClear, (state) => {
				state.message = ''
				state.code = undefined
				state.timestamp = undefined
			})
	},
})

export const noitificationReducer = noitificationSlice.reducer
