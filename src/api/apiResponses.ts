export interface APIResponseError {
	code: string | number
	message: string
}

export interface ResponseData {
	status: number
	success: boolean
	error?: APIResponseError
}

export interface ApiResponse<T = unknown> {
	responseMeta: ResponseData
	data: T
	code?: string
}
