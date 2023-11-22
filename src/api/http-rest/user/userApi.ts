import Api from '../api'
import type { ApiResponse } from '../apiResponses'

export interface LoginUserRequest {
	email: string
	password: string
}

export interface CreateUserRequest {
	email: string
	password: string
}

export type CreateUserResponse = ApiResponse & {
	email: string
	id: string
}

export interface ForgotPasswordRequest {
	email: string
}

export interface TokenPasswordUpdateRequest {
	token: string
	password: string
	email: string
}

export interface VerifyTokenRequest {
	email: string
	token: string
}

export type FetchUserResponse = ApiResponse & {
	id: string
}

export interface FetchUserRequest {
	id: string
}

export interface LeaveWorkspaceRequest {
	workspaceId: string
}

export interface InviteUserRequest {
	email: string
	groupIds: string[]
	status?: string
}

export interface SendTestEmailPayload {
	smtpHost: string
	fromEmail: string
	smtpPort?: string
	username?: string
	password?: string
}

export interface CreateSuperUserRequest {
	email: string
	name: string
	source: 'FORM'
	state: 'ACTIVATED'
	isEnabled: boolean
	password: string
	role: 'Developer'
	companyName: string
	allowCollectingAnonymousData: boolean
	signupForNewsletter: boolean
}

export interface RequestUpdateMe {
	avatar?: File
	firstName?: string
	lastName?: string
}

// Response Data
export enum UserRole {
	'USER' = 'USER',
	'ADMIN' = 'ADMIN',
}

export interface ResponseUserData {
	id: string
	avatar: string | null
	email: string
	firstName: string | null
	lastName: string | null
	role: UserRole
}

class UserApi extends Api {
	static getMe() {
		return Api.get<ResponseUserData>(`users/me`)
	}

	static updateMe(request: RequestUpdateMe) {
		const formData = new FormData()
		for (const key in request)
			if (request[key]) formData.append(key, request[key])

		return Api.put<ResponseUserData>(`users/me`, formData, null, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}
}

export default UserApi
