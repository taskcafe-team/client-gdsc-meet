import Api from 'api/index'

export type ResponseSuccessDataCreateMeeting = {
	id: string
	startTime: string
	endTime: string | null
	title: string | null
	description: string | null
	status: string
	friendlyId: string
}

export default class MeetingApi extends Api {
	static async getAccessToken<T>(friendlyId: string) {
		const path = `meeting/${friendlyId}/access-token`
		return Api.get<T>(path)
	}

	static async createMeeting<T>() {
		const path = 'meeting'
		const body = {
			title: null,
			description: null,
			startDate: null,
			endDate: null,
			status: 'PUBLIC',
		}
		return Api.post<T>(path, body)
	}
}
