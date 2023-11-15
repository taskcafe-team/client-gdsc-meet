export interface ReponseMatadata {
	status: number
	message: string
	code?: string
}

export interface ApiResponse<T = undefined> {
	metadata: ReponseMatadata
	success: boolean
	data: T
	timestamp: number
}
