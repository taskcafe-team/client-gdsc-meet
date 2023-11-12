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
} from './layoutConstants'
import { MeetingInfo } from './layoutTypes'

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
export const meetingFetching = createAction(MEETING_FETCHING)
export const meetingFetchSuccess = createAction(MEETING_FETCH_SUCESS)
export const meetingFetchError =
	createAction<MeetingFetchError['payload']>(MEETING_FETCH_ERROR)
export const meetingAddInstant =
	createAction<MeetingAddInstant['payload']>(MEETING_ADD_INSTANT)
export const meetingAddInstants =
	createAction<MeetingAddInstants['payload']>(MEETING_ADD_INSTANTS)

/*----------- Thunk Action -----------*/
export const meetingFetchMyMeetings = createAsyncThunk(
	MEETING_FETCH_MY_INSTANTS,
	async (request = undefined, { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.getMyMeetings()
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstants(res.data as MeetingInfo[]))
		} else dispatch(meetingFetchError({ code: status, message }))
	}
)

export const meetingFetchGetInstant = createAsyncThunk(
	MEETING_FETCH_INSTANT,
	async (meetingId: string, { dispatch }) => {
		const res = await MeetingApi.getMeeting(meetingId)
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		} else dispatch(meetingFetchError({ code: status, message }))
		return res
	}
)

export const meetingFetchCreateInstant = createAsyncThunk(
	MEETING_FETCH_CREATE_INSTANT,
	async (
		request: RequestCreateMeetingBody,
		{ dispatch, fulfillWithValue, rejectWithValue }
	) => {
		const res = await MeetingApi.createMeeting(request)
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../))
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		else return rejectWithValue(res)
		return fulfillWithValue(res)
	}
)

export const meetingFetchDeleteInstants = createAsyncThunk(
	MEETING_FETCH_DELETE_INSTANCES,
	async (
		request: string[],
		{ dispatch, fulfillWithValue, rejectWithValue }
	) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.deleteMeetings({ ids: request }).catch(
			() => null
		)
		return fulfillWithValue(res)
		// const { status, message } = res.metadata
		// if (status.toString().match(/(2|3)../)) {
		// 	dispatch(meetingFetchSuccess())
		// 	dispatch(meetingFetchMyMeetings())
		// } else dispatch(meetingFetchError({ code: status, message }))
	}
)
