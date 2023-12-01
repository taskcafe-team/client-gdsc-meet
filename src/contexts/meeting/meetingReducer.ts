import { createSlice } from '@reduxjs/toolkit'
import {
	// meetingFetchError,
	// meetingFetchSuccess,
	// meetingFetching,
	meetingAddInstant,
	meetingAddInstants,
	meetingFetchCreateInstant,
} from './meetingActions'
import { MeetingsState } from './meetingTypes'

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
			.addCase(meetingAddInstant, (state, action) => {
				state.meetings.push(action.payload)
			})
			.addCase(meetingAddInstants, (state, action) => {
				state.meetings = [...action.payload]
			})
	},
})

export const meetingReducer = meetingSlice.reducer
