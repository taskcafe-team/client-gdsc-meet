import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
	MEETING_FETCHING,
	MEETING_FETCH_CREATE_INSTANT,
	MEETING_FETCH_ERROR,
	MEETING_FETCH_INSTANT,
	MEETING_FETCH_SUCESS,
	MEETING_ADD_INSTANT,
} from './meetingConstants'
import { MeetingInfo } from './meetingTypes'

import MeetingApi, { RequestCreateMeetingBody } from 'api/http-rest/meetingApi'

export interface MeetingFetchDetail {
	type: string
	payload: MeetingInfo
}

export interface MeetingAddInstant {
	type: string
	payload: MeetingInfo
}

/*----------- Action -----------*/
export const meetingFetching = createAction(MEETING_FETCHING)
export const meetingFetchSuccess = createAction(MEETING_FETCH_SUCESS)
export const meetingFetchError = createAction(MEETING_FETCH_ERROR)
export const meetingAddInstant =
	createAction<MeetingAddInstant['payload']>(MEETING_ADD_INSTANT)

/*----------- Thunk Action -----------*/
export const meetingFetchGetInstant = createAsyncThunk(
	MEETING_FETCH_INSTANT,
	async (friendlyId: string, { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.getMeeting(friendlyId)
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		} else {
			console.log(res.metadata)
		}
	}
)

export const MeetingFetchCreateInstant = createAsyncThunk(
	MEETING_FETCH_CREATE_INSTANT,
	async (request: RequestCreateMeetingBody, { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.createMeeting(request)
		const { status } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		} else {
			console.log(res.metadata)
		}
	}
)
