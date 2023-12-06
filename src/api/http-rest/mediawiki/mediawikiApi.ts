import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
import Api from '../api'

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

const headers: AxiosRequestConfig = {
	baseURL: 'https://vi.wikipedia.org/w',
}

class WikiMediaApi extends Api {
	static endpoint = '/api.php'
	static WikiMediaSearch = async (keyword: string): Promise<any> => {
		const params = {
			action: 'query',
			format: 'json',
			list: 'search',
			srlimit: 1,
			srsearch: keyword,
		}
		await Api.get(this.endpoint, params, headers)
	}
	static getPageInfo = async (pageId: number): Promise<any> => {
		const params = {
			action: 'parse',
			format: 'json',
			pageid: pageId,
		}
		return await Api.get(WikiMediaApi.endpoint, params, headers)
		// Extract and return relevant information from the response
	}
}

export default WikiMediaApi
