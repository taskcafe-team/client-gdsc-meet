import Api from 'api/http-rest/common/api'
import { ApiResponse } from 'api/http-rest/common/apiResponses'
import { generateName } from 'utils/personalNameUtils'
import {
	MeetingType,
	RequestCreateMeetingBody,
	ResponseMeetingDTO,
	ResponseAccessToken,
} from './meetingApiType'

export default class MeetingApi extends Api {
	static readonly meetingURL = 'meetings'

	static getMyMeetings() {
		const path = `${this.meetingURL}`
		return Api.get<ResponseMeetingDTO[]>(path)
	}

	static async getMeeting(meetingId: string) {
		const path = `${this.meetingURL}/${meetingId}`
		return Api.get<ResponseMeetingDTO>(path)
	}

	static async createMeeting(
		request: RequestCreateMeetingBody
	): Promise<ApiResponse<ResponseMeetingDTO>> {
		const body: RequestCreateMeetingBody = {
			title: request.title || generateName(),
			description: request.description || null,
			startDate: request.startDate || null,
			endDate: request.endDate || null,
			type: request.type || MeetingType.PUBLIC,
		}
		return Api.post<ResponseMeetingDTO>(`${this.meetingURL}`, body)
	}

	static async deleteMeetings(request: { ids: string[] }) {
		const path = `${this.meetingURL}`
		return Api.delete(path, request)
	}
}
