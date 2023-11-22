import Api from 'api/http-rest/api'
import { ApiResponse } from 'api/http-rest/apiResponses'
import { generateName } from 'utils/personalNameUtils'
import {
	MeetingType,
	RequestCreateMeetingBody,
	ResponseMeetingDto,
} from './meetingApiType'

export class MeetingApi extends Api {
	static readonly meetingURL = 'meetings'

	static getMyMeetings() {
		const path = `${this.meetingURL}`
		return Api.get<ResponseMeetingDto[]>(path)
	}

	static async getMeeting(meetingId: string) {
		const path = `${this.meetingURL}/${meetingId}`
		return Api.get<ResponseMeetingDto>(path)
	}

	static async createMeeting(
		request: RequestCreateMeetingBody
	): Promise<ApiResponse<ResponseMeetingDto>> {
		const body: RequestCreateMeetingBody = {
			title: request.title || generateName(),
			description: request.description || null,
			startDate: request.startDate || null,
			endDate: request.endDate || null,
			type: request.type || MeetingType.PUBLIC,
		}
		return Api.post<ResponseMeetingDto>(`${this.meetingURL}`, body)
	}

	static async deleteMeetings(request: { ids: string[] }) {
		const path = `${this.meetingURL}`
		return Api.delete(path, request)
	}
}
export default MeetingApi
