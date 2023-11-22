/* eslint-disable @typescript-eslint/lines-between-class-members */
import Api from 'api/http-rest/common/api'
import { CreateUserRequest, LoginUserRequest } from '../user/userApi'
import { ApiResponse } from 'api/http-rest/common/apiResponses'
import { setLocalStorageItem } from 'utils/localStorageUtils'
import axios, { type AxiosResponse } from 'axios'

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

	private static refreshingToken: Promise<AxiosResponse> | undefined = undefined
	static async refreshToken() {
		if (!this.refreshingToken) {
			this.refreshingToken = axios
				.post(`${this.authUrl}/refresh-token`)
				.then((res) => {
					if (res.status.toString().startsWith('2')) {
						const { accessToken } = res.data
						// setLocalStorageItem({ key: `access_token`, value: accessToken })
					}

					return res
				})
				.finally(() => (this.refreshingToken = undefined))
		}
		return this.refreshingToken
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
