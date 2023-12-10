export interface WikiMediaSearchResult {
	batchcomplete: string
	continue: {
		sroffset: number
		continue: string
	}
	query: {
		searchinfo: {
			totalhits: number
		}
		search: [
			{
				ns: number
				title: string
				pageid: number
				size: number
				wordcount: number
				snippet: string
				timestamp: string
			}
		]
	}
}
// -------------Sumary Interface------------------------
interface NamespaceInfo {
	id: number
	text: string
}

interface TitlesInfo {
	canonical: string
	normalized: string
	display: string
}

interface DesktopContentUrls {
	page: string
	revisions: string
	edit: string
	talk: string
}

interface MobileContentUrls {
	page: string
	revisions: string
	edit: string
	talk: string
}

interface ContentUrls {
	desktop: DesktopContentUrls
	mobile: MobileContentUrls
}

export interface WikiMediaSummaryResult {
	keyword?: string
	type: string
	title: string
	displaytitle: string
	namespace: NamespaceInfo
	wikibase_item: string
	titles: TitlesInfo
	pageid: number
	lang: string
	dir: string
	revision: string
	tid: string
	timestamp: string
	content_urls: ContentUrls
	extract: string
	extract_html: string
}
