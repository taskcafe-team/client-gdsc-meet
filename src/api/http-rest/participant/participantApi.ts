import Api from 'api/http-rest/api'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { type AxiosRequestConfig } from 'axios'
import {
	AccessPermissionsStatus,
	ParticipantUsecaseDto,
} from './participantDtos'
import {
	RequestUpdateMeetingBody,
	ResponseMeetingDto,
} from '../meeting/meetingApiType'

type RequestSendMessage = {
	roomId: string
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

export type ResponseParticipantGetAccessToken = {
	token: string
	status: AccessPermissionsStatus
	participant: ParticipantUsecaseDto
}

export default class ParticipantApi extends Api {
	// static readonly participantURL = 'meetings/:meetingId/participants'

	static savePartATToSessionStore(meetingId: string, token: string) {
		sessionStorage.setItem(`${meetingId}`, token)
	}

	static getPartATFromSessionStore(meetingId: string) {
		return sessionStorage.getItem(`${meetingId}`)
	}

	static getParticipantAccessToken(meetingId: string, customName: string) {
		const path = `meetings/${meetingId}/participants/access-token`
		const query = { customName }
		return Api.get<ResponseParticipantGetAccessToken>(path, query)
	}

	static sendMessage(meetingId: string, request: RequestSendMessage) {
		const token = ParticipantApi.getPartATFromSessionStore(meetingId)
		if (!token) throw new Error('Token not found')
		const key = import.meta.env.API_MEETING_TOKEN_HEADER
		const config: AxiosRequestConfig = { headers: { [key]: token } }
		const path = `meetings/${meetingId}/participants/send-message`
		return Api.post(path, request, null, config)
	}

	static respondRequestJoinMeeting(
		meetingId: string,
		request: { partIds: string[]; status: AccessPermissionsStatus }
	) {
		const token = ParticipantApi.getPartATFromSessionStore(meetingId)
		if (!token) throw new Error('Token not found')
		const key = import.meta.env.API_MEETING_TOKEN_HEADER
		const config: AxiosRequestConfig = { headers: { [key]: token } }

		const path = `meetings/${meetingId}/participants/respond-join-request`
		return Api.patch<void>(path, request, null, config)
	}

	static updateMeetingPermision(
		meetingId: string,
		request: RequestUpdateMeetingBody
	) {
		const path = `meetings/${meetingId}/participants/meeting-permission`
		return Api.put<ResponseMeetingDto>(path, request)
	}
}
