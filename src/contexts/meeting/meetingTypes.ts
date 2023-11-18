import { CommonState } from '../types'
import { ResponseMeetingDto } from 'api/http-rest/meeting/meetingApiType'

export type MeetingInfo = ResponseMeetingDto
export interface MeetingsState extends CommonState {
	meetings: MeetingInfo[]
}
