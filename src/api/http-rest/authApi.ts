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

export class AuthApi extends Api {
	private static authUrl = 'auth'

	private static emailLoginlUrl = `${this.authUrl}/email/login`

	private static registerUrl = `${this.authUrl}/email/register`

	static async loginWithEmail<T = unknown>(
		request: LoginUserRequest
	): Promise<ApiResponse<T>> {
		return this.post<T>(this.emailLoginlUrl, request)
	}

	static async registerWithEmail<T>(
		request: CreateUserRequest
	): Promise<ApiResponse<T>> {
		return this.post<T>(this.registerUrl, request)
	}
}

export default AuthApi
