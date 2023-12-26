import axios, {
	AxiosResponse,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosHeaders,
	AxiosRequestHeaders,
} from 'axios'
import Api from '../api'
import { WikiMediaSearchResult, WikiMediaSummaryResult } from './mediawikiType'
import { ApiResponse } from '../apiResponses'

interface SearchResult {
	ns: number
	title: string
	pageid: number
	size: number
	wordcount: number
	snippet: string
	timestamp: string
}

interface ResponseSearch {
	batchcomplete: string
	continue: {
		sroffset: number
		continue: string
	}
	query: {
		searchinfo: {
			totalhits: number
		}
		search: SearchResult[]
	}
}

const headers = {
	baseURL: 'https://vi.wikipedia.org',
	withCredentials: false,
	mode: 'no-cors',
	accept: '/'
}

class WikiMediaApi extends Api {
	static defaultEndpoint = '/w/api.php'
	static summaryEndpoint = '/api/rest_v1/page/summary'

	static WikiMediaSearch = async (
		keyword: string
	): Promise<ApiResponse<WikiMediaSearchResult>> => {
		const params = {
			action: 'query',
			format: 'json',
			list: 'search',
			srlimit: '10',
			srsearch: keyword,
			origin: '*',
		}

		return await Api.get(WikiMediaApi.defaultEndpoint, params, headers)
	}

	static getSummary = async (
		title: string
	): Promise<ApiResponse<WikiMediaSummaryResult>> => {
		const url = `${this.summaryEndpoint}/${encodeURIComponent(title)}`
		return await Api.get(url, null, headers)
	}

	static getPageInfo = async (pageId: number): Promise<any> => {
		const params = new URLSearchParams({
			action: 'parse',
			format: 'json',
			pageid: pageId.toString(), // Convert pageId to string
		})

		const url = `${headers.baseURL}${
			WikiMediaApi.defaultEndpoint
		}?${params.toString()}`
		return (await fetch(url)).json()
	}
}

export default WikiMediaApi
