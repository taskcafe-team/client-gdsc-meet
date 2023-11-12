export enum UserRole {
	ADMIN = 'ADMIN',
	GUEST = 'GUEST',
	USER = 'USER',
}

export interface UserUsecaseDto {
	id: string
	firstName: string
	lastName: string
	email: string
	role: UserRole
	isValid: boolean
	avatar: string
}
