import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { type NavigateFunction } from 'react-router-dom'
import {
	MEETING_FETCHING,
	MEETING_FETCH_CREATE_INSTANT,
	MEETING_FETCH_ERROR,
	MEETING_FETCH_INSTANT,
	MEETING_FETCH_SUCESS,
	MEETING_ADD_INSTANT,
	MEETING_FETCH_CREATE_INSTANT_AND_JOIN,
	MEETING_FETCH_MY_INSTANTS,
	MEETING_ADD_INSTANTS,
	MEETING_FETCH_DELETE_INSTANCES,
} from './meetingConstants'
import { MeetingInfo } from './meetingTypes'

import MeetingApi, { RequestCreateMeetingBody } from 'api/http-rest/meetingApi'
import RouterPath from 'views/routes/routesContants'
import { CommonError } from 'contexts/types'

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
	async (friendlyId: string, { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.getMeeting(friendlyId)
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		} else dispatch(meetingFetchError({ code: status, message }))
	}
)

export const meetingFetchCreateInstant = createAsyncThunk(
	MEETING_FETCH_CREATE_INSTANT,
	async (request: RequestCreateMeetingBody, { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.createMeeting(request)
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstant(res.data as MeetingInfo))
		} else dispatch(meetingFetchError({ code: status, message }))
	}
)

export const meetingFetchCreateInstantAndJoin = createAsyncThunk(
	MEETING_FETCH_CREATE_INSTANT_AND_JOIN,
	async (
		request: RequestCreateMeetingBody & { navigate: NavigateFunction },
		{ dispatch }
	) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.createMeeting(request)
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingAddInstant(res.data as MeetingInfo))
			request.navigate(RouterPath.getPreMeetingPath(res.data.friendlyId))
		} else dispatch(meetingFetchError({ code: status, message }))
	}
)

export const meetingFetchDeleteInstants = createAsyncThunk(
	MEETING_FETCH_DELETE_INSTANCES,
	async (request: string[], { dispatch }) => {
		dispatch(meetingFetching())
		const res = await MeetingApi.deleteMeetings({ ids: request })
		const { status, message } = res.metadata
		if (status.toString().match(/(2|3)../)) {
			dispatch(meetingFetchSuccess())
			dispatch(meetingFetchMyMeetings())
		} else dispatch(meetingFetchError({ code: status, message }))
	}
)
