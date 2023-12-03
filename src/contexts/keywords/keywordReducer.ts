import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { KeywordDetailState } from './keywordTypes'
import { keywordConnectSocket, keywordDisconnectSocket, keywordFetch, keywordReset, keywordSendToSocket } from './keywordActions'
import { CommonError } from 'contexts/types'

const initialState: KeywordDetailState = {
	sid: '',
	clientResult: '',
	keywords: [],
	loading: false,
	error: undefined,
}

const keywordSlice = createSlice({
	name: 'keyword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(keywordReset, (state) => {
				state.clientResult = ''
			})
			.addCase(keywordFetch.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(keywordFetch.fulfilled, (state, action) => {
				state.loading = false
				state.clientResult += `/n ${action.payload}`
			})
			.addCase(keywordFetch.rejected, (state) => {
				state.loading = false
			})

			.addCase(keywordConnectSocket.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			  })
			  .addCase(keywordConnectSocket.fulfilled, (state) => {
				state.loading = false;
				// Update state or handle success as needed
			  })
			
			  .addCase(keywordDisconnectSocket.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			  })
			  .addCase(keywordDisconnectSocket.fulfilled, (state) => {
				state.loading = false;
				// Update state or handle success as needed
			  })
			  .addCase(keywordDisconnectSocket.rejected, (state, action) => {
				state.loading = false;
				// Handle errors or update state as needed
				// state.error = action.error?.message || 'Error disconnecting from the socket';
			  })
			  .addCase(keywordSendToSocket.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			  })
			  .addCase(keywordSendToSocket.fulfilled, (state) => {
				state.loading = false;
				// Update state or handle success as needed
			  })
			  .addCase(keywordSendToSocket.rejected, (state, action) => {
				state.loading = false;
				// Handle errors or update state as needed
				// state.error = action.error?.message || 'Error sending data to the socket';
			  });
	},
})

export const keywordReducer = keywordSlice.reducer
