import type {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import { getLocalStorageItem } from '../../../utils/localStorageUtils'
import { ResponseMetadata } from './apiResponses'

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	config.headers = config.headers ?? {}
	// const methodUpper = config.method?.toUpperCase()
	// if (methodUpper && methodUpper !== 'GET' && methodUpper !== 'HEAD')
	const keyStoreAccessToken = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
	config.headers['x-api-token'] = `${getLocalStorageItem(keyStoreAccessToken)}`

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
		const meta = error.response.data as ResponseMetadata | null
		const _error = meta?.error

		const responseError = {
			message: _error?.message ?? 'Internal Server Response Format Error',
			code: _error?.code ?? 'AE-APP-5000',
			action: _error?.action ?? 'DEFAULT',
			title: _error?.title ?? ' "Internal server error",',
			errorType: _error?.errorType ?? 'INTERNAL_ERROR',
		}
		return Promise.reject({ ...error, ...responseError })
	} else if (error.request) {
		//
	} else {
		//
	}

	return Promise.reject(error)
}
