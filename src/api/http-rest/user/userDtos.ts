export enum UserRole {
	ADMIN = 'ADMIN',
	GUEST = 'GUEST',
	USER = 'USER',
}

export interface UserUsecaseDTO {
	id: string
	firstName: string
	lastName: string
	email: string
	role: UserRole
	isValid: boolean
	avatar: string
}
