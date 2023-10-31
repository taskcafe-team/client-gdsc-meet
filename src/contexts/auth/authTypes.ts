import { CommonState } from '../types'

export interface IAuth {
	isLogin: boolean
}

export interface AuthDetailState extends IAuth, CommonState {
	loading: boolean
}
