import { UserRole } from 'api/http-rest/user/userApi'
import { CommonState } from '../types'

export interface UserInfo {
	id: string
	avatar: string | null
	email: string
	firstName: string | null
	lastName: string | null
	role: UserRole
}

export interface UserInfoState extends UserInfo, CommonState {}
