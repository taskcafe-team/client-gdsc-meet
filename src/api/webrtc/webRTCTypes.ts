import {
	AccessPermissionsStatus,
	ParticipantRole,
	ParticipantUsecaseDto,
} from 'api/http-rest/participant/participantDtos'

export enum RoomType {
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
	status: AccessPermissionsStatus
}

export type ParticipantSendMessageDto = {
	roomId: string
	roomType: RoomType
	senderId: string
	content: string
}
