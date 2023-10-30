export interface ApiResponseError {
	code: string
	message: string
}

export interface ReponseMatadata {
	status: number
	success: boolean
	message: string
	error?: ApiResponseError
}

export interface ApiResponse<T = unknown> {
	metadate: ReponseMatadata
	data: T
	timestamp: number
}
