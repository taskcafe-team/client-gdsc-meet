import { type AxiosPromise } from 'axios'
import Api from '../api'
import { LoginUserRequest } from './userApi'
import { ApiResponse } from 'api/apiResponses'

export class AuthApi extends Api {
	private static authUrl = 'auth'

	private static emailLoginlUrl = `${this.authUrl}/email/login`

	static async loginWithEmail(
		request: LoginUserRequest
	): Promise<AxiosPromise<ApiResponse>> {
		return this.post(this.emailLoginlUrl, request)
	}
}

export default AuthApi
