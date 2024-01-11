import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { KeywordDetailState } from './keywordTypes'
import {
	keywordConnectSocket,
	keywordDisconnectSocket,
	keywordFetch,
	keywordPost,
	keywordReset,
	keywordSendToSocket,
} from './keywordActions'
import { CommonError } from 'contexts/types'

interface IInitialState extends KeywordDetailState {
	clientResult: string,
	socket:null|any
}

const initialState: IInitialState = {
	value: [
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: ['Object oriented Programming','programming', 'software', 'web development', 'IT', 'coding','Tiền lập trình'],
		},
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: ['database', 'SQL', 'backend', 'server', 'API'],
		},
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: ['frontend', 'HTML', 'CSS', 'JavaScript', 'framework'],
		},
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: [
				'networking',
				'security',
				'protocols',
				'firewall',
				'cybersecurity',
			],
		},
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: [
				'data science',
				'machine learning',
				'analytics',
				'statistics',
				'AI',
			],
		},
	],
	Sid: '',
	length: 5,
	loading: false,
	error: undefined,
	clientResult: '',
	socket:null
}

const keywordSlice = createSlice({
	name: 'keyword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(keywordReset, (state) => {
				// state.clientResult = ''
			})
			.addCase(keywordFetch, (state, action) => {
				state.loading = true
				const newKeyword = action.payload
				const existingKeywords = state.value
				const keywordsExist = newKeyword.keywords.some((newKeyword) =>
					existingKeywords.some((existingKeyword) =>
						existingKeyword.keywords.includes(newKeyword)
					)
				)

				if (!keywordsExist) {
					state.value = [...state.value,newKeyword]
				}

				state.loading = false
			})

			.addCase(keywordConnectSocket.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(keywordConnectSocket.fulfilled, (state) => {
				state.loading = false
				// Update state or handle success as needed
			})

			.addCase(keywordDisconnectSocket.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(keywordDisconnectSocket.fulfilled, (state) => {
				state.loading = false
				// Update state or handle success as needed
			})
			.addCase(keywordDisconnectSocket.rejected, (state, action) => {
				state.loading = false
				// Handle errors or update state as needed
				// state.error = action.error?.message || 'Error disconnecting from the socket';
			})
			.addCase(keywordSendToSocket.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(keywordSendToSocket.fulfilled, (state) => {
				state.loading = false
				// Update state or handle success as needed
			})
			.addCase(keywordSendToSocket.rejected, (state, action) => {
				state.loading = false
				// Handle errors or update state as needed
				// state.error = action.error?.message || 'Error sending data to the socket';
			})
			.addCase(keywordPost.fulfilled, (state, action) => {
				// state.value =  [...state.value,action.payload]
			})
	},
})

export const keywordReducer = keywordSlice.reducer
