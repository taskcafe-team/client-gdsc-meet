import { createSlice } from '@reduxjs/toolkit'
import { NoitificationState } from './notificationTypes'
import { noitificationSet, noitificationClear } from './notificationActions'

const initialState: NoitificationState = {
	payload: {
		message: '',
		code: undefined,
		timestamp: undefined,
	},
}

const noitificationSlice = createSlice({
	name: 'noitification',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(noitificationSet, (state, action) => {
				state.payload.message = action.payload.message
				state.payload.code = action.payload.code
				state.payload.timestamp =
					state.payload.timestamp || new Date('2012-02-26').getTime()
			})
			.addCase(noitificationClear, (state) => {
				state.payload.message = ''
				state.payload.code = undefined
				state.payload.timestamp = undefined
			})
	},
})

export const noitificationReducer = noitificationSlice.reducer
