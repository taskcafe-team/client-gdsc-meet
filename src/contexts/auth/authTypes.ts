import { CommonError, CommonState } from '../types'

export interface IAuth {
	isLogin: boolean
}

export interface AuthDetailState extends IAuth, CommonState {}

// Action Type
export interface AuthFetchSucess {
	type: string
}

export interface AuthFetchError {
	type: string
	payload: CommonError
}

export interface AuthFetchEmailLogin {
	type: string
}

export interface AuthFetchGoogleLogin {
	type: string
}
