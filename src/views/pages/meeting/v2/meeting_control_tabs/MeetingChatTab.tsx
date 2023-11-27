import { Chat } from '@mui/icons-material'
import React from 'react'
import ChatBox from 'views/containers/meeting/components/ChatBox'
import { IMeetingControlTab } from '../../types'
import { useMeetingSideBar } from '../MeetingSideBarProvider'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { Loading } from 'views/routes/routes'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ChatMessageCardProps } from 'views/containers/meeting/components/ChatMessageCard'
import {
	getSenderInRoom,
	messageCardFromSender,
} from 'views/pages/meeting/utils'
import { Badge } from '@mui/joy'

function MeetingChatTab() {
	const { getRoomConnected } = useMeeting()
	const { hidden, setUnreadMeetingMessges, currentTab } = useMeetingSideBar()
	const chatRoom = getRoomConnected('', RoomType.MEETING)
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const sendMessage = useCallback(
		async (content) => {
			if (!chatRoom) return
			const { roomId, roomType } = chatRoom
			await ParticipantApi.sendMessage({ roomId, roomType, content })
		},
		[chatRoom]
	)

	const pushMessage = useCallback(
		(newMess: ChatMessageCardProps) => {
			setMessages((prev) => {
				const length = prev.length
				if (length === 0) return [...prev, newMess]

				const lastmess = prev[length - 1]
				const lastSenderId = lastmess.messageContent.senderId
				const currentSenderId = newMess.messageContent.senderId

				if (lastSenderId === currentSenderId) {
					const contents = newMess.messageContent.contents
					lastmess.messageContent.contents.push(...contents)
					return [...prev.slice(0, length - 1), lastmess]
				} else return [...prev, newMess]
			})

			setUnreadMeetingMessges((s) => {
				if (currentTab === 'meeting_chat') if (!hidden) return 0
				return s + 1
			})
		},
		[hidden, currentTab, hidden]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDto) => {
			if (!chatRoom) return
			const sender = getSenderInRoom(payload.senderId, chatRoom)
			if (!sender) return
			const newMessage = messageCardFromSender(sender, payload.content)
			pushMessage(newMessage)
		},
		[chatRoom, pushMessage]
	)

	useLayoutEffect(() => {
		if (!chatRoom) return
		const listener = new WebRTCListenerFactory(chatRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)

		return () => {
			chatRoom.disconnect()
			listener.removeAllListeners()
		}
	}, [chatRoom])

	if (!chatRoom) return <Loading />
	return (
		<ChatBox onSend={sendMessage} title={'Meeting Chat'} messages={messages} />
	)
}

MeetingChatTab.Icon = () => {
	const { unreadMeetingMessges } = useMeetingSideBar()
	console.log('unreadMeetingMessges', unreadMeetingMessges)
	return (
		<Badge badgeContent={unreadMeetingMessges} color="primary">
			<Chat />
		</Badge>
	)
}

const meetingChatTab: IMeetingControlTab = {
	Icon: MeetingChatTab.Icon,
	Tab: MeetingChatTab,
}
export default meetingChatTab
