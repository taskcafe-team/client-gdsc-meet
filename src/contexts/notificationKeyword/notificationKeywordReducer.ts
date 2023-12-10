import { createSlice } from '@reduxjs/toolkit'
import { INotificationKeywordState } from './notificationKeywordType'
import {
	noitificationKeywordClose,
	noitificationKeywordFetch,
	noitificationKeywordLoading,
	noitificationKeywordOpen,
	noitificationKeywordvisible,
} from './notificationKeywordAction'

const initialState: INotificationKeywordState = {
	extract: '',
	title: '',
	visible: true,
	loading: false,
	error: undefined,
}

const noitificationKeyword = createSlice({
	name: 'noitificationKeyword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(noitificationKeywordOpen, (state) => {
				state.visible = false
			})
			.addCase(noitificationKeywordClose, (state) => {
				state.visible = true
			})
			.addCase(noitificationKeywordLoading, (state) => {
				state.loading = !state.loading
			})
			.addCase(noitificationKeywordvisible, (state) => {
				state.visible = !state.visible
			})
			.addCase(noitificationKeywordFetch.fulfilled, (state, action) => {
				const { title, extract } = action.payload
				state.extract = extract
				state.title = title
				state.loading = false
			})
			.addCase(noitificationKeywordFetch.pending, (state, action) => {
				state.loading = true
			})
	},
})

export const noitificationKeywordReducer = noitificationKeyword.reducer
