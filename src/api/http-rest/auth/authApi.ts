/* eslint-disable @typescript-eslint/lines-between-class-members */
import Api from 'api/http-rest/api'
import { CreateUserRequest, LoginUserRequest } from '../user/userApi'
import { ApiResponse } from 'api/http-rest/apiResponses'
import {
	getLocalStorageItem,
	setLocalStorageItem,
} from 'utils/localStorageUtils'

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
export type ResponseLoginSuccess = {
	id: string
	accessToken: string
	refreshToken: string
}

class AuthApi extends Api {
	private static authUrl = 'auth'
	private static emailLoginlUrl = `${this.authUrl}/email/login`
	private static registerUrl = `${this.authUrl}/email/register`
	private static googleAuthVeryfyUrl = `auth/google/verify`

	static saveUserAccessToken(token: string) {
		const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
		setLocalStorageItem(key, token)
	}

	static getUserAccessToken(token: string): string {
		const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
		return getLocalStorageItem(key) as string
	}

	static loginWithEmail(request: LoginUserRequest) {
		return this.post<ResponseLoginSuccess>(this.emailLoginlUrl, request)
	}

	static registerWithEmail<T>(
		request: CreateUserRequest
	): Promise<ApiResponse<T>> {
		return Api.post<T>(this.registerUrl, request)
	}

	static googleAuthVerify(search: string) {
		return Api.get<ResponseLoginSuccess>(this.googleAuthVeryfyUrl + search)
	}
}
export default AuthApi
