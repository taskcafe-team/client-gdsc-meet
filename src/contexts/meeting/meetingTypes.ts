import { CommonState } from '../types'
import { ResponseMeetingDTO } from 'api/http-rest/meeting/meetingApiType'

export type MeetingInfo = ResponseMeetingDTO
export interface MeetingsState extends CommonState {
	meetings: MeetingInfo[]
}
