import axios, {
	AxiosResponse,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosHeaders,
	AxiosRequestHeaders,
} from 'axios'
import Api from '../api'
import { WikiMediaSearchResult, WikiMediaSummaryResult } from './mediawikiType'

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
}

class WikiMediaApi extends Api {
	static defaultEndpoint = '/w/api.php'
	static summaryEndpoint = '/api/rest_v1/page/summary'
	// static WikiMediaSearch = async (keyword: string): Promise<any> => {
	// 	const params = {
	// 		action: 'query',
	// 		format: 'json',
	// 		list: 'search',
	// 		srlimit: 1,
	// 		srsearch: keyword,
	// 	}
	// 	return await Api.get(this.defaultEndpoint, params, headers)
	// }
	// static getPageInfo = async (pageId: number): Promise<any> => {
	// 	const params = {
	// 		action: 'parse',
	// 		format: 'json',
	// 		pageid: pageId,
	// 	}
	// 	return await Api.get(WikiMediaApi.defaultEndpoint, params, headers)
	// 	// Extract and return relevant information from the response
	// }

	// static getSummary = async (title) => {
	// 	const url = `${this.summaryEndpoint}/${encodeURIComponent(title)}`
	// 	return await Api.get(url, null, headers)
	// }

	static WikiMediaSearch = async (
		keyword: string
	): Promise<WikiMediaSearchResult> => {
		const params = new URLSearchParams({
			action: 'query',
			format: 'json',
			list: 'search',
			srlimit: '10',
			srsearch: keyword,
			origin:'*'
		})
		const url = `${headers.baseURL}${this.defaultEndpoint}?${params.toString()}`
		return (await fetch(url)).json()
	}

	static getSummary = async (
		title: string
	): Promise<WikiMediaSummaryResult> => {
		const url = `${headers.baseURL}${this.summaryEndpoint}/${encodeURIComponent(
			title
		)}`
		return (await fetch(url)).json()
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
