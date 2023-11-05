import Api from 'api/api'
import { MeetingInfo } from 'contexts/meeting'
import { generateName } from 'utils/personalNameUtils'

export enum MeetingStatus {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export type ResponseMeetingDto = {
	id: string
	friendlyId: string
	title: string | null
	startTime: string
	endTime: string | null
	description: string | null
	status: MeetingStatus
}

export type ResponseSuccessDataCreateMeeting = ResponseMeetingDto

export type RequestCreateMeetingBody = {
	title?: string | null
	description?: string | null
	startDate?: string | null
	endDate?: string | null
	status?: MeetingStatus | null
}

type ResponseAccessToken = {
	permissions: {
		status: string
	}
	token: string
}

export default class MeetingApi extends Api {
	static async getMeeting(friendlyId: string) {
		const path = `meeting/${friendlyId}`
		return Api.get<ResponseSuccessDataCreateMeeting>(path)
	}

	static async createMeeting(request: RequestCreateMeetingBody) {
		const body: RequestCreateMeetingBody = {
			title: request.title || generateName(),
			description: request.description || null,
			startDate: request.startDate || null,
			endDate: request.endDate || null,
			status: request.status || MeetingStatus.PUBLIC,
		}
		return Api.post<ResponseMeetingDto>('meeting', body)
	}

	static async getAccessToken(friendlyId: string) {
		const path = `meeting/${friendlyId}/access-token`
		return Api.get<ResponseAccessToken>(path)
	}
}
