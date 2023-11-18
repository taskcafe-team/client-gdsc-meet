import {
	CreateTokenDto,
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import {
	ParticipantRole,
	ParticipantUsecaseDto,
} from 'api/http-rest/participant/participantDtos'

export enum RoomType {
	DEFAULT = 'default',
	MEETING = 'meeting',
	WAITING = 'waiting',
}

export type RoomDto = {
	id: string
	type: RoomType
}

export type AccessTokenMetadata = ParticipantUsecaseDto & {
	room: RoomDto
}

export type ParticipantMetadata = {
	id: string
	meetingId: string
	name: string
	userId: string | null
	role: ParticipantRole
}

// ----- Dtos ----- //
export type ParticipantRequestJoinDto = {
	status: RespondJoinStatus
	token?: CreateTokenDto
}

export type ParticipantSendMessageDto = {
	roomId: string
	roomType: RoomType
	senderId: string
	content: string
}
