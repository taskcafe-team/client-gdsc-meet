export interface CommonError {
	code: number | string
	message: string
}

export interface CommonState {
	error?: CommonError
	loading?: boolean
}
