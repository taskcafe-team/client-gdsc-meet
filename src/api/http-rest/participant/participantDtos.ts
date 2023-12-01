export enum ParticipantRole {
	HOST = 'HOST',
	OBSERVER = 'OBSERVER',
	PARTICIPANT = 'PARTICIPANT',
	ANONYMOUSE = 'ANONYMOUSE', // chưa thêm permission
}

export type AccessPermissionsStatus = 'wait' | 'accept' | 'reject'

export type ParticipantUsecaseDto = {
	id: string
	meetingId: string
	name: string
	role: ParticipantRole
	userId?: string
}
