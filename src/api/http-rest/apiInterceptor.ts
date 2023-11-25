import type {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import {
	getLocalStorageItem,
	removeLocalStorageItem,
	setLocalStorageItem,
} from '../../utils/localStorageUtils'
import { ApiResponse, ResponseMetadata } from './apiResponses'
import axios from 'axios'

class AuthUtils {
	private static refreshingToken: Promise<AxiosResponse> | undefined = undefined

	static async refreshToken(config?: AxiosRequestConfig<null>) {
		if (!this.refreshingToken) {
			this.refreshingToken = axios
				.post(`auth/refresh-token`, undefined, config)
				.finally(() => (this.refreshingToken = undefined))
		}
		return this.refreshingToken
	}
}

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	config.headers = config.headers ?? {}
	const keyStoreAccessToken = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
	const headerKey = import.meta.env.API_ACCESS_TOKEN_HEADER
	const token = getLocalStorageItem(keyStoreAccessToken) as string
	if (token) config.headers[headerKey] = `${token}`
	return config
}

export const apiFailureRequestInterceptor = async (error: unknown) => {
	return Promise.resolve(error)
}

export const apiSuccessResponseInterceptor = async (
	response: AxiosResponse
): Promise<AxiosResponse['data']> => {
	return response.data
}

export const apiFailureResponseInterceptor = (error: AxiosError) => {
	if (error.response) {
		// Handle refresh token
		// if (error.response.status === 401) {
		// 	try {
		// 		const config = error.response.config
		// 		const res = await AuthUtils.refreshToken(config)
		// 		const { accessToken } = res.data
		// 		const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
		// 		setLocalStorageItem(key, accessToken)
		// 		const headerKey = import.meta.env.API_ACCESS_TOKEN_HEADER
		// 		config.headers[headerKey] = `${accessToken}`
		// 		return await axios.request(config)
		// 	} catch (_err) {
		// 		removeLocalStorageItem(import.meta.env.API_KEY_STORE_ACCESS_TOKEN)
		// 		Object.assign(error, _err)
		// 	}
		// }

		const dataErr = error.response.data as ApiResponse
		const message = dataErr.metadata.message
		const _error = dataErr.metadata.error
		const errMessage =
			_error?.message ?? message ?? 'Internal Server Response Format Error'
		const responseError = {
			message: errMessage,
			code: _error?.code ?? 'AE-APP-5000',
			action: _error?.action ?? 'DEFAULT',
			title: _error?.title ?? ' "Internal server error",',
			errorType: _error?.errorType ?? 'INTERNAL_ERROR',
		}

		return Promise.reject({ ...error, ...responseError })
	} else if (error.request) {
		console.error('Request Error ', error.request)
	} else {
		//
	}

	return Promise.reject(error)
}
