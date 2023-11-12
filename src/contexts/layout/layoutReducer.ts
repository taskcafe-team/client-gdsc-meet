import { createSlice } from '@reduxjs/toolkit'
import {
	meetingAddInstant,
	meetingAddInstants,
	meetingFetchCreateInstant,
	meetingFetchError,
	meetingFetchSuccess,
	meetingFetching,
} from './layoutActions'
import { MeetingsState } from './layoutTypes'

const initialState: MeetingsState = {
	meetings: [],
	loading: false,
	error: undefined,
}

const meetingSlice = createSlice({
	name: 'meeting',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(meetingFetching, (state) => {
				state.loading = true
			})
			.addCase(meetingFetchSuccess, (state) => {
				state.loading = false
				state.error = undefined
			})
			.addCase(meetingFetchError, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(meetingAddInstant, (state, action) => {
				state.meetings.push(action.payload)
			})
			.addCase(meetingAddInstants, (state, action) => {
				state.meetings = [...action.payload]
			})
	},
})

export const meetingReducer = meetingSlice.reducer
