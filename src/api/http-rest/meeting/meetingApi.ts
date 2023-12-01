import Api from 'api/http-rest/api'
import { ApiResponse } from 'api/http-rest/apiResponses'
import { generateName } from 'utils/personalNameUtils'
import {
	MeetingType,
	RequestCreateMeetingBody,
	RequestUpdateMeetingBody,
	ResponseGetMeetingRoom,
	ResponseMeetingDto,
} from './meetingApiType'
import { type AxiosRequestConfig } from 'axios'
import ParticipantApi from '../participant/participantApi'

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

	static async getMeetingRooms(meetingId: string) {
		const token = ParticipantApi.getPartATFromSessionStore(meetingId)
		const key = 'meeting-api-token'
		const config: AxiosRequestConfig = { headers: { [key]: token } }
		const path = `${this.meetingURL}/${meetingId}/rooms`
		return Api.get<ResponseGetMeetingRoom>(path, undefined, config)
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

	static async updateMeeting(
		meetingId: string,
		request: RequestUpdateMeetingBody
	) {
		const path = `${this.meetingURL}/${meetingId}`
		return Api.put<ResponseMeetingDto>(path, request)
	}

	static async deleteMeetings(request: { ids: string[] }) {
		const path = `${this.meetingURL}`
		return Api.delete(path, request)
	}
}
export default MeetingApi
