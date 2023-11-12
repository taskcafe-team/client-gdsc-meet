import { ResponseMeetingDto } from 'api/http-rest/meeting/meetingApiType'
import { CommonState } from '../types'

export type MeetingInfo = ResponseMeetingDto

export interface MeetingsState extends CommonState {
	meetings: MeetingInfo[]
}
