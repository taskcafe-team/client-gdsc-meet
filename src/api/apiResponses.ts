export interface ApiResponseError {
	code: string
	message: string
}

export interface ReponseMatadata {
	code: string
	status: number
	success: boolean
	message: string
	error?: ApiResponseError
}

export interface ApiResponse<T = undefined> {
	metadata: ReponseMatadata
	data: T
	timestamp: number
}
