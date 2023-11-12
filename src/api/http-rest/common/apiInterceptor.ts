import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorageItem } from '../../../utils/localStorageUtils'
import useToastily from 'hooks/useToastily'

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
	const status = response.data.metadata
	return response.data
}

export const apiFailureResponseInterceptor = async (error: any) => {
	const Toastily = useToastily()
	Toastily({ content: 'Something went wrong', type: 'error' })
	return
}
