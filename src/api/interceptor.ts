import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocalStorageItem } from '../utils/localStorageUtils'

export const apiRequestInterceptor = (config: AxiosRequestConfig) => {
	config.headers = config.headers ?? {}

	const methodUpper = config.method?.toUpperCase()
	if (methodUpper && methodUpper !== 'GET' && methodUpper !== 'HEAD')
		config.headers['x-api-token'] = `${getLocalStorageItem('access_token')}`

	return { ...config, timer: performance.now() }
}

export const apiSuccessResponseInterceptor = (
	response: AxiosResponse
): AxiosResponse['data'] => {
	return response.data
}

export const apiFailureResponseInterceptor = async (error: any) => {
	return Promise.resolve(error)
}
