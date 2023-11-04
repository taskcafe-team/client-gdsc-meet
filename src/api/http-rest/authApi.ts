/* eslint-disable @typescript-eslint/lines-between-class-members */
import Api from 'api/api'
import { CreateUserRequest, LoginUserRequest } from './userApi'
import { ApiResponse } from 'api/apiResponses'

export type ResponseDataRegisterSuccess = {
	id: string
	firstName: string | null
	lastName: string | null
	email: string
	role: string
	isValid: boolean
	avatar: null | null
}

// Response Data
export interface ResponseLoginSuccess {
	id: string
	accessToken: string
	refreshToken: string
}

export class AuthApi extends Api {
	private static authUrl = 'auth'
	private static emailLoginlUrl = `${this.authUrl}/email/login`
	private static registerUrl = `${this.authUrl}/email/register`
	private static googleAuthVeryfyUrl = `auth/google/verify`

	static async loginWithEmail(request: LoginUserRequest) {
		return this.post<ResponseLoginSuccess>(this.emailLoginlUrl, request)
	}

	static async registerWithEmail<T>(
		request: CreateUserRequest
	): Promise<ApiResponse<T>> {
		return Api.post<T>(this.registerUrl, request)
	}

	static async googleAuthVerify(search: string) {
		return Api.get<ResponseLoginSuccess>(this.googleAuthVeryfyUrl + search)
	}
}

export default AuthApi
