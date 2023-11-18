export enum ParticipantRole {
	HOST = 'HOST',
	OBSERVER = 'OBSERVER',
	PARTICIPANT = 'PARTICIPANT',
	ANONYMOUSE = 'ANONYMOUSE', // chưa thêm permission
}

export type ParticipantUsecaseDto = {
	id: string
	name: string
	userId: string
	role: ParticipantRole
	meetingId: string
}
