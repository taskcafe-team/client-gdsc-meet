import Api from 'api/http-rest/common/api'
import { AxiosRequestConfig } from 'axios'
import { getLocalStorageItem } from 'utils/localStorageUtils'

interface RequestSendMessage {
	sendto?: string[]
	message: string
}

export default class ParticipantApi extends Api {
	static readonly participantURL = 'meetings/:meetingId/participants'

	static async sendMessage(meetingId: string, request: RequestSendMessage) {
		const token = getLocalStorageItem('meeting-api-token')
		const config: AxiosRequestConfig<any> = {
			headers: { 'meeting-api-token': token },
		}
		const path = `meetings/${meetingId}/participants/send-message`
		return await Api.post(path, request, null, config)
	}
}
