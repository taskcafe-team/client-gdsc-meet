import type { AxiosPromise } from 'axios'
import Api from '..'
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

export interface UpdateUserRequest {
	name?: string
	email?: string
	proficiency?: string
	role?: string
	useCase?: string
	intercomConsentGiven?: boolean
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

// Response Data
export type ResponseSuccessDataGetMe = {
	id: string
	avatar: string
	email: string
	firstName: string
	lastName: string
	role: 'USER' | 'ADMIN'
}

export default class UserApi extends Api {
	static async getMe<T>() {
		return Api.get<T>(`users/me`)
	}
}
