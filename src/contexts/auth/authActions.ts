import { CommonError } from '../types'
import { IAuth } from './authTypes'
import {
	AUTH_DETAIL_FETCH,
	AUTH_DETAIL_DATA,
	AUTH_DETAIL_ERROR,
	AUTH_LOGOUT,
	AUTH_SUCESS,
	AUTH_LOGIN_SUCESS,
} from './authConstants'
import { createAction } from '@reduxjs/toolkit'

// interface of action
export interface AuthDetailFetch {
	type: typeof AUTH_DETAIL_FETCH
}

export interface AuthDetailData {
	type: typeof AUTH_DETAIL_DATA
	payload: IAuth
}

export interface AuthDetailError {
	type: typeof AUTH_DETAIL_ERROR
	payload: CommonError
}

export interface AuthLogout {
	type: typeof AUTH_LOGOUT
}

export interface AuthSuccess {
	type: typeof AUTH_SUCESS
}

export interface AuthLoginSuccess {
	type: typeof AUTH_LOGIN_SUCESS
}

// action
export const authDetailFetch = createAction(AUTH_DETAIL_FETCH)
export const authDetailData =
	createAction<AuthDetailData['payload']>(AUTH_DETAIL_DATA)
export const authDetailError =
	createAction<AuthDetailError['payload']>(AUTH_DETAIL_ERROR)
export const authLogout = createAction(AUTH_LOGOUT)
export const authLoginSuccess = createAction(AUTH_LOGIN_SUCESS)
