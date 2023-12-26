class GoogleAiPrompt {
	static getSummaryKeyword(text: string): string {
		return `Thế nào là "${text}"? Tôi muốn nhận được giải thích đơn giản.`
	}
}

export default GoogleAiPrompt
