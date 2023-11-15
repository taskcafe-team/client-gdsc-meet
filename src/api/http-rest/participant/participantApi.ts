import Api from 'api/http-rest/common/api'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { AxiosRequestConfig } from 'axios'
import { ParticipantUsecaseDTO } from './participantDTOs'

type RequestSendMessage = {
	roomId: string
	roomType: RoomType
	content: string
}

export type CreateTokenDTO = {
	roomId: string
	roomType: RoomType
	roomToken: string
}

type ResponseGetAccessToken = {
	participant: ParticipantUsecaseDTO
	tokens: CreateTokenDTO[]
}

export default class ParticipantApi extends Api {
	static readonly participantURL = 'meetings/:meetingId/participants'

	static async getAccessToken(meetingId: string) {
		const path = `meetings/${meetingId}/participants/access-token`
		return await Api.get<ResponseGetAccessToken>(path)
	}

	static async sendMessage(request: RequestSendMessage) {
		const token = ParticipantApi.getMeetingApiToken({
			roomId: request.roomId,
			roomType: request.roomType,
		})

		const config: AxiosRequestConfig = {
			headers: { 'meeting-api-token': token },
		}
		const path = `meetings/${request.roomId}/participants/send-message`
		return await Api.post(path, request, null, config)
	}

	static setMeetingApiToken(token: CreateTokenDTO) {
		sessionStorage.setItem(
			`meeting-api-token:${token.roomType}:${token.roomId}`,
			token.roomToken
		)
	}

	static getMeetingApiToken(token: Omit<CreateTokenDTO, 'roomToken'>) {
		return sessionStorage.getItem(
			`meeting-api-token:${token.roomType}:${token.roomId}`
		)
	}
}
