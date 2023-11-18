import {
	CreateTokenDTO,
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import {
	ParticipantRole,
	ParticipantUsecaseDTO,
} from '../http-rest/participant/participantDtos'

export enum RoomType {
	DEFAULT = 'default',
	MEETING = 'meeting',
	WAITING = 'waiting',
}

export type RoomDTO = {
	id: string
	type: RoomType
}

export type AccessTokenMetadata = ParticipantUsecaseDTO & {
	room: RoomDTO
}

export type ParticipantMetadata = {
	id: string
	meetingId: string
	name: string
	userId: string | null
	role: ParticipantRole
}

// ----- DTOs ----- //
export type ParticipantRequestJoinDTO = {
	status: RespondJoinStatus
	token?: CreateTokenDTO
}

export type ParticipantSendMessageDTO = {
	roomId: string
	roomType: RoomType
	senderId: string
	content: string
}
