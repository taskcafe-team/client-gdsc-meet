import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
	MEETING_FETCHING,
	MEETING_FETCH_CREATE_INSTANT,
	MEETING_FETCH_ERROR,
	MEETING_FETCH_INSTANT,
	MEETING_FETCH_SUCESS,
	MEETING_ADD_INSTANT,
	MEETING_FETCH_MY_INSTANTS,
	MEETING_ADD_INSTANTS,
	MEETING_FETCH_DELETE_INSTANCES,
} from './meetingConstants'
import { MeetingInfo } from './meetingTypes'

import MeetingApi from 'api/http-rest/meeting/meetingApi'
import { CommonError } from 'contexts/types'
import { RequestCreateMeetingBody } from 'api/http-rest/meeting/meetingApiType'

export interface MeetingFetchError {
	type: string
	payload: CommonError
}

export interface MeetingAddInstant {
	type: string
	payload: MeetingInfo
}

export interface MeetingAddInstants {
	type: string
	payload: MeetingInfo[]
}

/*----------- Action -----------*/
// export const meetingFetching = createAction(MEETING_FETCHING)
// export const meetingFetchSuccess = createAction(MEETING_FETCH_SUCESS)
// export const meetingFetchError =
// 	createAction<MeetingFetchError['payload']>(MEETING_FETCH_ERROR)
export const meetingAddInstant =
	createAction<MeetingAddInstant['payload']>(MEETING_ADD_INSTANT)
export const meetingAddInstants =
	createAction<MeetingAddInstants['payload']>(MEETING_ADD_INSTANTS)

/*----------- Thunk Action -----------*/
export const meetingFetchMyMeetings = createAsyncThunk(
	MEETING_FETCH_MY_INSTANTS,
	async (request = undefined, { dispatch }) => {
		const res = await MeetingApi.getMyMeetings()
		const { success } = res
		if (success) dispatch(meetingAddInstants(res.data))
		return res
	}
)

export const meetingFetchGetInstant = createAsyncThunk(
	MEETING_FETCH_INSTANT,
	async (meetingId: string, { dispatch }) => {
		const res = await MeetingApi.getMeeting(meetingId)
		const { success } = res
		if (success) dispatch(meetingAddInstant(res.data))
		return res
	}
)

export const meetingFetchCreateInstant = createAsyncThunk(
	MEETING_FETCH_CREATE_INSTANT,
	async (request: RequestCreateMeetingBody, { dispatch }) => {
		const res = await MeetingApi.createMeeting(request)
		const { success } = res
		if (success) dispatch(meetingAddInstant(res.data as MeetingInfo))
		return res
	}
)

export const meetingFetchDeleteInstants = createAsyncThunk(
	MEETING_FETCH_DELETE_INSTANCES,
	async (
		request: string[],
		{ dispatch, fulfillWithValue, rejectWithValue }
	) => {
		const res = await MeetingApi.deleteMeetings({ ids: request })
		const { success, metadata } = res
		if (success) dispatch(meetingFetchMyMeetings())
		return res
	}
)
