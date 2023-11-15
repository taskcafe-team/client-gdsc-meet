import {
	ParticipantRole,
	ParticipantUsecaseDTO,
} from '../../api/http-rest/participant/participantDTOs'

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
	participantId: string
}

export type ParticipantSendMessageDTO = {
	roomId: string
	roomType: RoomType
	senderId: string
	content: string
}
