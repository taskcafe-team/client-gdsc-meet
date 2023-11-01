import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorageItem } from '../utils/localStorageUtils'
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
	return response.data
}

export const apiFailureResponseInterceptor = async (error: any) => {
	return Promise.resolve(error)
}
