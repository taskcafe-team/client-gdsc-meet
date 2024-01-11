/* eslint-disable no-undef */
import {
	createAction,
	createAsyncThunk,
	isRejectedWithValue,
	isRejected,
} from '@reduxjs/toolkit'
import {
	KEYWORD_CONNECT_SOCKET,
	KEYWORD_DISCONNECT_SOCKET,
	KEYWORD_FETCHING,
	KEYWORD_RESET,
	KEYWORD_SEND_TO_SOCKET,
	KEYWORD_START_RECORD,
	POST_KEYWORD,
} from './keywordConstants'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { IKeyword, KeywordFetch } from './keywordTypes'
import { CommonError } from 'contexts/types'

export const keywordReset = createAction(KEYWORD_RESET)
export const keywordFetch = createAction<IKeyword>(KEYWORD_FETCHING);

export const keywordConnectSocket = createAsyncThunk<boolean, void>(
	KEYWORD_CONNECT_SOCKET,
	async () => {
		// Your code here
		return true
	}
)
export const keywordDisconnectSocket = createAsyncThunk<boolean, void>(
	KEYWORD_DISCONNECT_SOCKET,
	async () => {
		// Your code for disconnecting the socket here
		return true
	}
)

export const keywordSendToSocket = createAsyncThunk<void, string>(
	KEYWORD_SEND_TO_SOCKET,
	async (data, { rejectWithValue, dispatch }) => {
		try {
			// Your code to send data to the socket
		} catch (error) {
			// Handle errors as needed
			const commonError: CommonError = {
				code: 500,
				message: 'Error sending data to socket',
			}

			return rejectWithValue(commonError)
		}
	}
)

export const keywordPost = createAsyncThunk(
	POST_KEYWORD,
	async (data, { rejectWithValue, dispatch }) => {
		try {
			return data
		} catch (error) {
			// Handle errors as needed
			const commonError: CommonError = {
				code: 500,
				message: 'Can not send data',
			}

			return rejectWithValue(commonError)
		}
	}
)
