import { Dispatch } from 'react'

export type MeetingTabControl =
	| 'waiting_chat'
	| 'meeting_chat'
	| 'participant_control'
	| 'meeting_setting'
	| 'summary_keyword'

export type MeetingSideBarState = {
	hidden: boolean
	currentTab: MeetingTabControl
	unreadMeetingMessges: number
	unreadWaitingMessges: number
	setHidden: Dispatch<React.SetStateAction<boolean>>
	setCurrentTab: Dispatch<React.SetStateAction<MeetingTabControl>>
	setUnreadMeetingMessges: Dispatch<React.SetStateAction<number>>
	setUnreadWaitingMessges: Dispatch<React.SetStateAction<number>>
}

export type IMeetingControlTab = {
	Icon: () => React.JSX.Element
	Tab: () => React.JSX.Element
}
