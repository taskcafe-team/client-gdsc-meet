import { MeetingStatus } from 'api/http-rest/meetingApi'
import { CommonState } from '../types'

export interface MeetingInfo {
	id: string
	friendlyId: string
	title: string | null
	startTime: string
	endTime: string | null
	description: string | null
	status: MeetingStatus
}

export interface MeetingsState extends CommonState {
	meetings: MeetingInfo[]
}
