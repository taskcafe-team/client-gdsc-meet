import { RoomType } from 'api/webrtc/webRTCTypes'
import Api from '../api'
import { type AxiosRequestConfig } from 'axios'
import ParticipantApi from '../participant/participantApi'

type ResponseGetAccessToken = {
	roomId: string
	roomType: string
	token: string
}

export class RoomApi extends Api {
	static getAccessToken(meetingId: string, roomId: string) {
		const token = ParticipantApi.getPartATFromSessionStore(meetingId)
		const key = import.meta.env.API_MEETING_TOKEN_HEADER
		const config: AxiosRequestConfig = { headers: { [key]: token } }
		const part = `rooms/access-token?roomId=${roomId}`
		return this.get<ResponseGetAccessToken>(part, undefined, config)
	}

	static saveRoomIdToSessionStorage(
		meetingId: string,
		roomId: string,
		roomType: RoomType
	) {
		sessionStorage.setItem(`${meetingId}:${roomType}`, roomId)
	}

	static getRoomIdInSessionStorage(meetingId: string, roomType: RoomType) {
		return sessionStorage.getItem(`${meetingId}:${roomType}`)
	}
}
