import { ParticipantRole } from 'api/http-rest/participant/participantDtos'

export interface ParticipantMetadata {
	id: string
	meetingId: string
	name: string
	userId: string | null
	role: ParticipantRole
}

// ----- DTOs ----- //
export interface ParticipantRequestJoinDTO {
	participantId: string
}

export interface ParticipantSendMessageDTO {
	sendby: string
	message: string
}
