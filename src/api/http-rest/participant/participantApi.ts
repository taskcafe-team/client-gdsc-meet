import Api from 'api/http-rest/common/api'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { type AxiosRequestConfig } from 'axios'
import { ParticipantUsecaseDto } from './participantDtos'

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

export type CreateTokenDto = {
	roomId: string
	roomType: RoomType
	roomToken: string
}

type ResponseGetAccessToken = {
	participant: ParticipantUsecaseDto
	tokens: CreateTokenDto[]
}

export default class ParticipantApi extends Api {
	static readonly participantURL = 'meetings/:meetingId/participants'

	static getAccessToken(meetingId: string, customName: string) {
		const path = `meetings/${meetingId}/participants/access-token`
		const query = { customName }
		return Api.get<ResponseGetAccessToken>(path, query)
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

	static respondRequestJoinMeeting(request: {
		meetingId: string
		participantIds: string[]
		status: RespondJoinStatus
	}) {
		const roomId = request.meetingId
		const roomType = RoomType.WAITING
		const token = ParticipantApi.getMeetingApiToken({ roomId, roomType })

		const config: AxiosRequestConfig = {
			headers: { 'meeting-api-token': token },
		}
		const path = `meetings/${request.meetingId}/participants/respond-join-request`
		return Api.patch(path, request, null, config)
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

	static setMeetingApiToken(token: CreateTokenDto) {
		sessionStorage.setItem(
			`meeting-api-token:${token.roomType}:${token.roomId}`,
			token.roomToken
		)
	}

	static getMeetingApiToken(token: Omit<CreateTokenDto, 'roomToken'>) {
		return sessionStorage.getItem(
			`meeting-api-token:${token.roomType}:${token.roomId}`
		)
	}
}
