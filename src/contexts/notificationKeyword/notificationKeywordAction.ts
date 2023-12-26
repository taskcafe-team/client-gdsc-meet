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
			// Check cache
			console.log(request)

			const fetchCache: WikiMediaSummaryResult[] | null | unknown =
				await getSessionStorage(CACHE_KEYWORDS)
				console.log("fetch cache:",fetchCache);
				
			if (fetchCache && Array.isArray(fetchCache)) {
				const cachedData = fetchCache.find((item) => item.title === keyword)
				if (cachedData) {
					return {
						title: cachedData.title,
						extract: cachedData.extract,
					} as INotificationKeyword
				}
			}
			console.log(keyword)

			const FetchSummary = await GoogleAiApi.generateGemini({
				prompt: GoogleAiPrompt.getSummaryKeyword(`${keyword}`),
			})
			console.log(FetchSummary)
			console.log(typeof(FetchSummary));
			

			// const SearchWiki = await WikiMediaApi.WikiMediaSearch(`${keyword}`)
			// const FetchSummary = await WikiMediaApi.getSummary(
			// 	SearchWiki.query.search[0].title || ''
			// )

			// const { title, extract } = FetchSummary
			const title = keyword
			const extract = FetchSummary
			if (!title || !extract) {
				throw new Error('Invalid response') // Throw an error if the response is invalid
			}

			// Update cache
			const updatedCache: WikiMediaSummaryResult[] = [
				...(fetchCache ?? []),
				{
					title: keyword,
					extract:FetchSummary
					
				},
			]
			setSessionStorage(CACHE_KEYWORDS, updatedCache)

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
