import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type CreateAxiosDefaults,
} from 'axios'

import { REQUEST_TIMEOUT_MS } from './apiConstants'
import {
	apiRequestInterceptor,
	apiFailureRequestInterceptor,
	apiSuccessResponseInterceptor,
	apiFailureResponseInterceptor,
} from './apiInterceptor'
import { Agent } from 'https'
import { ApiResponse } from './apiResponses'
import { convertObjectToQueryParams } from 'utils/urlUtils'

const apiRequestConfig: CreateAxiosDefaults<unknown> = {
	baseURL: `${import.meta.env.API_BASE_URL}`,
	timeout: REQUEST_TIMEOUT_MS,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	httpAgent: new Agent({ rejectUnauthorized: false }),
}

export const axiosInstance: AxiosInstance = axios.create(apiRequestConfig)

// -- Request --
axiosInstance.interceptors.request.use(
	(cf) => apiRequestInterceptor(cf),
	(err) => apiFailureRequestInterceptor(err)
)

// -- Response --
axiosInstance.interceptors.response.use(
	(res) => apiSuccessResponseInterceptor(res),
	(err) => apiFailureResponseInterceptor(err)
)

class Api {
	static get<T>(
		url: string,
		queryParams?: unknown,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.get<T>(_url, { ...config }) as unknown as Promise<
			ApiResponse<T>
		>
	}

	static post<T>(
		url: string,
		body?: unknown,
		queryParams?: unknown,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.post<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async put<T>(
		url: string,
		body?: unknown,
		queryParams?: unknown,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.put<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async patch<T>(
		url: string,
		body?: unknown,
		queryParams?: unknown,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.patch<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async delete<T>(
		url: string,
		queryParams?: unknown,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.delete<T>(_url, { ...config }) as unknown as Promise<
			ApiResponse<T>
		>
	}
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export default Api
