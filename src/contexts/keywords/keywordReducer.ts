import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { KeywordDetailState } from './keywordTypes'
import { keywordConnectSocket, keywordDisconnectSocket, keywordFetch, keywordPost, keywordReset, keywordSendToSocket } from './keywordActions'
import { CommonError } from 'contexts/types'

interface IInitialState extends KeywordDetailState{
	clientResult :string;
}

const initialState: IInitialState = {
	value: [
		{
			endAt: new Date(),
			startAt: new Date(),
			keywords: ["programming", "software", "web development", "IT", "coding"],
		  },
		  {
			endAt: new Date(),
			startAt: new Date(),
			keywords: ["database", "SQL", "backend", "server", "API"],
		  },
		  {
			endAt: new Date(),
			startAt: new Date(),
			keywords: ["frontend", "HTML", "CSS", "JavaScript", "framework"],
		  },
		  {
			endAt: new Date(),
			startAt: new Date(),
			keywords: ["networking", "security", "protocols", "firewall", "cybersecurity"],
		  },
		  {
			endAt: new Date(),
			startAt: new Date(),
			keywords: ["data science", "machine learning", "analytics", "statistics", "AI"],
		  },
	],
	Sid: "",
	length: 5,
	loading: false,
	error: undefined,
	clientResult:''
  };
  

const keywordSlice = createSlice({
	name: 'keyword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(keywordReset, (state) => {
				// state.clientResult = ''
			})
			.addCase(keywordFetch.pending, (state) => {
				state.loading = true
				state.error = undefined
			})
			.addCase(keywordFetch.fulfilled, (state, action) => {
				state.loading = false
				
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
			  })
			 .addCase(keywordPost.fulfilled,(state, action)=>{
			
			 });
	},
})

export const keywordReducer = keywordSlice.reducer
