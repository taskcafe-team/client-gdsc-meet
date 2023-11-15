import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorageItem } from '../../../utils/localStorageUtils'
import useToastily from 'hooks/useToastily'
import { ApiResponse } from './apiResponses'

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
	const { message, success, error, timestamp } = response.data
	const status = response.status
	const isFormat = success ?? message ?? error ?? timestamp ?? status ?? false
	const _response: ApiResponse = {
		metadata: {
			status: isFormat ? status : 500,
			message: isFormat ? message : 'Something went wrong',
			code: isFormat ? error?.code : undefined,
		},
		success: isFormat ? success : false,
		data: isFormat ? response.data : undefined,
		timestamp: isFormat ? timestamp : undefined,
	}
	// ----------------------------------------------- //

	return _response
}

export const apiFailureResponseInterceptor = async (error: any) => {
	console.log('--- Axios Error ---')
	return
}
