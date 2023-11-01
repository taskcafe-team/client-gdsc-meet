import Api from 'api/index'
import { LoginUserRequest } from './userApi'
import { ApiResponse } from 'api/apiResponses'

export class AuthApi extends Api {
	private static authUrl = 'auth'

	private static emailLoginlUrl = `${this.authUrl}/email/login`

	static async loginWithEmail<T = unknown>(
		request: LoginUserRequest
	): Promise<ApiResponse<T>> {
		return this.post<T>(this.emailLoginlUrl, request)
	}
}

export default AuthApi
