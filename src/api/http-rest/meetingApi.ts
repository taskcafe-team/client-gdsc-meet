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
	static readonly meetingURL = 'meeting'

	static async getMyMeetings() {
		const path = `${this.meetingURL}`
		return await Api.get<MeetingInfo[]>(path)
	}

	static async getMeeting(friendlyId: string) {
		const path = `${this.meetingURL}/${friendlyId}`
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
		return Api.post<ResponseMeetingDto>(`${this.meetingURL}`, body)
	}

	static async deleteMeetings(request: { ids: string[] }) {
		const path = `${this.meetingURL}`
		return Api.delete(path, request)
	}

	static async getAccessToken(friendlyId: string) {
		const path = `${this.meetingURL}/${friendlyId}/access-token`
		return Api.get<ResponseAccessToken>(path)
	}
}
