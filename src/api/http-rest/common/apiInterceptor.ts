import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorageItem } from '../../../utils/localStorageUtils'
import useToastily from 'hooks/useToastily'
import { ApiResponse, ApiResponseError } from './apiResponses'

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	config.headers = config.headers ?? {}
	// const methodUpper = config.method?.toUpperCase()
	// if (methodUpper && methodUpper !== 'GET' && methodUpper !== 'HEAD')
	config.headers['x-api-token'] = `${getLocalStorageItem('access_token')}`

	return config
}

export const apiFailureRequestInterceptor = async (error: any) => {
	return Promise.resolve(error)
}

export const apiSuccessResponseInterceptor = (
	response: AxiosResponse
): AxiosResponse['data'] => {
	// ----[ Format the response from the server ]---- //
	const { success, error, timestamp, data } = response.data
	const status = response.status

	const _response: ApiResponse = {
		metadata: { status: status, error },
		success: success ?? false,
		data: data ?? undefined,
		timestamp: timestamp ?? new Date().getTime(),
	}
	// ----------------------------------------------- //

	return _response
}

export const apiFailureResponseInterceptor = (error: any) => {
	const _response: ApiResponse = {
		metadata: { status: 500, error: { code: 500, message: 'Fetch Error!' } },
		data: undefined,
		success: false,
		timestamp: new Date().getTime(),
	}

	return _response
	// return Promise.reject({
	// 	...error,
	// 	..._response.metadata.error,
	// })
}
