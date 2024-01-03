import Api from '../api'

class GoogleAiApi {
	static readonly geminiEndpoint = '/googleAi/generateGemini'
	static readonly baseEndpoint = '/googleAi/generateBase'

	static generateGemini({ prompt }: { prompt: string }) {
		return Api.post(this.geminiEndpoint, { prompt }, null)
	}
   
}

export default GoogleAiApi
