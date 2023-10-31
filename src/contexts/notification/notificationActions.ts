import { NOITIFICATION_SET, NOITIFICATION_CLEAR } from './notificationConstants'
import { createAction } from '@reduxjs/toolkit'
import { INoitificationMessage } from './notificationTypes'

// interface of action
export interface NoitificationSet {
	type: typeof NOITIFICATION_SET
	payload: INoitificationMessage
}

export interface NoitificationClear {
	type: typeof NOITIFICATION_CLEAR
}

export type NoitificationActions = NoitificationSet | NoitificationClear

export const noitificationSet =
	createAction<NoitificationSet['payload']>(NOITIFICATION_SET)
export const noitificationClear = createAction(NOITIFICATION_CLEAR)
