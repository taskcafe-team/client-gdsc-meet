import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserInfo } from './userTypes'
import UserApi, { RequestUpdateMe } from 'api/http-rest/user/userApi'
import { authLogged } from 'contexts/auth'
import { USER_FETCH_ME, USER_FETCH_UPDATE_ME } from './userConstants'

export type userSetMe = {
	type: string
	payload: UserInfo
}

export const userSetMe = createAction<userSetMe['payload']>(USER_FETCH_ME)

/*----------- Thunk Action -----------*/
export const userFetchMe = createAsyncThunk(
	USER_FETCH_ME,
	async (_, { dispatch }) => {
		const res = await UserApi.getMe()
		const { success } = res.metadata
		if (success) {
			dispatch(authLogged())
			dispatch(userSetMe(res.data as UserInfo))
		}
		return res
	}
)

export const userFetchUpdateMe = createAsyncThunk(
	USER_FETCH_UPDATE_ME,
	async (request: RequestUpdateMe, { dispatch }) => {
		const res = await UserApi.updateMe(request)
		const { success } = res.metadata
		if (success) dispatch(userFetchMe())
		return res
	}
)

//TODO: SOAP can tim hieu
