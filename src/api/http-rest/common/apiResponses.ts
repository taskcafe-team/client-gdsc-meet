export type ApiResponseError = {
	code: number | string
	message: string
}

export type ResponseMetadata = {
	status: number
	error?: ApiResponseError
}

export type ApiResponse<T = undefined> = {
	metadata: ResponseMetadata
	success: boolean
	data: T
	timestamp: number
}
