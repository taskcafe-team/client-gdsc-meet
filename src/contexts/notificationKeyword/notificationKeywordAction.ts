/* eslint-disable no-undef */
import {
	createAction,
	createAsyncThunk,
	isRejectedWithValue,
	isRejected,
} from '@reduxjs/toolkit'
import {
	CACHE_KEYWORDS,
	CACHE_REMOVE,
	FETCH_NOTIFICATION_KEYWORD,
	NOTIFICATION_KEYWORD_CLOSE,
	NOTIFICATION_KEYWORD_LOADING,
	NOTIFICATION_KEYWORD_OPEN,
	NOTIFICATION_KEYWORD_VISIBLE,
} from './notificationKeywordConstants'
import {
	INotificationKeyword,
	noitificationKeywordFetchDTO,
} from './notificationKeywordType'
import WikiMediaApi from 'api/http-rest/mediawiki/mediawikiApi'
import { CommonError } from 'contexts/types'
import { getSessionStorage, setSessionStorage } from 'utils/sessionStorageUtils'
import { WikiMediaSummaryResult } from 'api/http-rest/mediawiki/mediawikiType'
import GoogleAiApi from 'api/http-rest/GoogleAi/GoogleAiApi'
import GoogleAiPrompt from 'api/http-rest/GoogleAi/GoogleAiPrompt'

export const noitificationKeywordLoading = createAction(
	NOTIFICATION_KEYWORD_LOADING
)

export const noitificationKeywordOpen = createAction(NOTIFICATION_KEYWORD_OPEN)

export const noitificationKeywordClose = createAction(
	NOTIFICATION_KEYWORD_CLOSE
)

export const noitificationKeywordvisible = createAction(
	NOTIFICATION_KEYWORD_VISIBLE
)

export const noitificationKeywordFetch = createAsyncThunk<
	INotificationKeyword,
	noitificationKeywordFetchDTO
>(
	FETCH_NOTIFICATION_KEYWORD,
	async (
		request: noitificationKeywordFetchDTO,
		{ dispatch, rejectWithValue }
	) => {
		try {
			const { keyword } = request

			const fetchCache: WikiMediaSummaryResult[] | null | unknown =
				await getSessionStorage(CACHE_KEYWORDS)

			if (fetchCache && Array.isArray(fetchCache)) {
				const cachedData = fetchCache.find((item) => item.title === keyword)
				if (cachedData) {
					return {
						title: cachedData.title,
						extract: cachedData.extract,
					} as INotificationKeyword
				}
			}

			const fetchSummary = await GoogleAiApi.generateGemini({
				prompt: GoogleAiPrompt.getSummaryKeyword(`${keyword}`),
			})

			const title: string = keyword
			const extract: any = fetchSummary

			if (!title || !extract) {
				throw new Error('Invalid response') // Throw an error if the response is invalid
			}

			const mapCache: any = fetchCache || []

			// Update cache
			const updatedCache = [
				...mapCache,
				{
					title: keyword,
					extract: fetchSummary,
				},
			]
			setSessionStorage('CACHE_KEYWORDS', updatedCache)

			return { title, extract } as INotificationKeyword
		} catch (error) {
			const commonError: CommonError = {
				code: 500,
				message: 'Can not find summary',
			}
			return rejectWithValue(commonError)
		}
	}
)

export const noitificationRemoveCache = createAction(CACHE_REMOVE)
