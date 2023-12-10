/* eslint-disable no-undef */
import {
	createAction,
	createAsyncThunk,
	isRejectedWithValue,
	isRejected,
} from '@reduxjs/toolkit'
import {
	CACHE_KEYWORDS,
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
			
			const fetchCache: WikiMediaSummaryResult[] | null | unknown =
				await getSessionStorage(CACHE_KEYWORDS)
			if (fetchCache && Array.isArray(fetchCache)) {
				const cachedData = fetchCache.find((item) => item.keyword === keyword)
				if (cachedData) {
					return {
						title: cachedData.title,
						extract: cachedData.extract,
					} as INotificationKeyword
				}
			}
			const SearchWiki = await WikiMediaApi.WikiMediaSearch(`${keyword}`)
			const FetchSummary = await WikiMediaApi.getSummary(
				SearchWiki.query.search[0].title || ''
			)

			const { title, extract } = FetchSummary

			if (!title || !extract) {
				throw new Error('Invalid response') // Throw an error if the response is invalid
			}

			// Update cache
			const updatedCache: WikiMediaSummaryResult[] = [
				...(fetchCache ?? []),
				{
					...FetchSummary,
					keyword: keyword,
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
