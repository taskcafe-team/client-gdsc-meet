import { CommonState } from '../types'

export interface INoitificationMessage {
	code?: string
	message: string
	timestamp?: number
}

export interface NoitificationState extends CommonState {
	payload: INoitificationMessage
}
