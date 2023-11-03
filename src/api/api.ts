/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	CreateAxiosDefaults,
} from 'axios'
import qs from 'qs'

import { REQUEST_TIMEOUT_MS } from './apiConstants'
import {
	apiRequestInterceptor,
	apiFailureRequestInterceptor,
	apiSuccessResponseInterceptor,
	apiFailureResponseInterceptor,
} from './interceptor'
import { Agent } from 'https'
import { ApiResponse } from './apiResponses'

const apiRequestConfig: CreateAxiosDefaults<any> = {
	baseURL: `${'http://localhost:5000'}`,
	timeout: REQUEST_TIMEOUT_MS,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	httpAgent: new Agent({ rejectUnauthorized: false }),
}

const axiosInstance: AxiosInstance = axios.create(apiRequestConfig)

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
		queryParams?: any,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + qs.stringify(queryParams, { arrayFormat: 'brackets' })
		return axiosInstance.get<T>(_url, { ...config }) as unknown as Promise<
			ApiResponse<T>
		>
	}

	static post<T>(
		url: string,
		body?: any,
		queryParams?: any,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + qs.stringify(queryParams, { arrayFormat: 'brackets' })
		return axiosInstance.post<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async put<T>(
		url: string,
		body?: any,
		queryParams?: any,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + qs.stringify(queryParams, { arrayFormat: 'brackets' })
		return axiosInstance.put<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async patch<T>(
		url: string,
		body?: any,
		queryParams?: any,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + qs.stringify(queryParams, { arrayFormat: 'brackets' })
		return axiosInstance.patch<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async delete<T>(
		url: string,
		queryParams?: any,
		config: AxiosRequestConfig = {}
	) {
		const _url = url + qs.stringify(queryParams, { arrayFormat: 'brackets' })
		return axiosInstance.delete<T>(_url, { ...config }) as unknown as Promise<
			ApiResponse<T>
		>
	}
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export default Api
