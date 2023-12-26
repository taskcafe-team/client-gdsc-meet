import Api from '../api'
const headers = {
	baseURL: 'http://localhost:4000',
	withCredentials: false,
	mode: 'no-cors',
}
class GoogleAiApi {
	static readonly geminiEndpoint = '/googleAi/generateGemini'
	static readonly baseEndpoint = '/googleAi/generateBase'

	static generateGemini({ prompt }: { prompt: string }) {
		return Api.post(this.geminiEndpoint, { prompt }, null,headers)
	}
   
}

export default GoogleAiApi
