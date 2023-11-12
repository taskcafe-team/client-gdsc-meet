import { UserUsecaseDto } from '../user/userDtos'

export enum ParticipantRole {
	HOST = 'HOST',
	OBSERVER = 'OBSERVER',
	PARTICIPANT = 'PARTICIPANT',
}

export interface ParticipantUsecaseDto {
	id: string
	name: string
	userId: string
	role: ParticipantRole
	meetingId: string
	userInfo: UserUsecaseDto
}
