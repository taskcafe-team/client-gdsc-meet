/* eslint-disable import/no-unresolved */
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type CreateAxiosDefaults,
} from 'axios'
import env from '_/config/env/env.json'
const ENV = JSON.parse(JSON.stringify(env))

import { REQUEST_TIMEOUT_MS } from './apiConstants'
import {
	apiRequestInterceptor,
	apiFailureRequestInterceptor,
	apiSuccessResponseInterceptor,
	apiFailureResponseInterceptor,
} from './interceptor'
import { Agent } from 'https'
import { ApiResponse } from './apiResponses'
import { convertObjectToQueryParams } from 'utils/urlUtils'

const apiRequestConfig: CreateAxiosDefaults<any> = {
	baseURL: `${'https://gdsc-meet.us.to:5000'}`,
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
		const _url = url + convertObjectToQueryParams(queryParams)
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
		const _url = url + convertObjectToQueryParams(queryParams)
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
		const _url = url + convertObjectToQueryParams(queryParams)
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
		const _url = url + convertObjectToQueryParams(queryParams)
		return axiosInstance.patch<T>(_url, body, {
			...config,
		}) as unknown as Promise<ApiResponse<T>>
	}

	static async delete<T>(
		url: string,
		queryParams?: any,
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
