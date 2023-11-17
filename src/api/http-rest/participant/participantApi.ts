import Api from 'api/http-rest/common/api'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { AxiosRequestConfig } from 'axios'
import { ParticipantUsecaseDTO } from './participantDTOs'

export enum RespondJoinStatus {
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	PENDING = 'pending',
}

type RequestSendMessage = {
	roomId: string
	roomType: RoomType
	content: string
}

type RequestParticipantJoinMeeting = {
	participantIds: string[]
	meetingId: string
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

	static getAccessToken(meetingId: string) {
		const path = `meetings/${meetingId}/participants/access-token`
		return Api.get<ResponseGetAccessToken>(path)
	}

	static sendMessage(request: RequestSendMessage) {
		const token = ParticipantApi.getMeetingApiToken({
			roomId: request.roomId,
			roomType: request.roomType,
		})

		const config: AxiosRequestConfig = {
			headers: { 'meeting-api-token': token },
		}
		const path = `meetings/${request.roomId}/participants/send-message`
		return Api.post(path, request, null, config)
	}

	static accpectParticipantJoinMeeting(request: RequestParticipantJoinMeeting) {
		const token = ParticipantApi.getMeetingApiToken({
			roomId: request.meetingId,
			roomType: RoomType.MEETING,
		})

		const config: AxiosRequestConfig = {
			headers: { 'meeting-api-token': token },
		}
		const path = `meetings/${request.meetingId}/participants/respond-join-request`
		return Api.patch(
			path,
			{ ...request, status: RespondJoinStatus.ACCEPTED },
			null,
			config
		)
	}

	static rejectParticipantJoinMeeting(request: RequestParticipantJoinMeeting) {
		const token = ParticipantApi.getMeetingApiToken({
			roomId: request.meetingId,
			roomType: RoomType.MEETING,
		})

		const config: AxiosRequestConfig = {
			headers: { 'meeting-api-token': token },
		}

		const path = `meetings/${request.meetingId}/participants/respond-join-request`
		return Api.patch(
			path,
			{ ...request, status: RespondJoinStatus.REJECTED },
			null,
			config
		)
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
