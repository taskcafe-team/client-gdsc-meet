import Api from 'api/index'

export default class MeetingApi extends Api {
	static async getAccessToken<T>(friendlyId: string) {
		const path = `meeting/${friendlyId}/access-token`
		return Api.get<T>(path)
	}
}
