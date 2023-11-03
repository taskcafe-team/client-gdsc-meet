import { USER_DETAIL_DATA } from './userConstants'
import { createAction } from '@reduxjs/toolkit'
import { UserInfo } from './userTypes'

// interface of action
export interface UserDetailData {
	type: typeof USER_DETAIL_DATA
	payload: UserInfo
}

// action
export const userDetailData =
	createAction<UserDetailData['payload']>(USER_DETAIL_DATA)
