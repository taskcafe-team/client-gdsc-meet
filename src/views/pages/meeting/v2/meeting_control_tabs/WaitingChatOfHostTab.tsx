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

function WaitingChatOfHostTab() {
	const { meetingId, getRoomConnected } = useMeeting()
	const hostChatRoom = getRoomConnected('', RoomType.WAITING)

	const { hidden } = useMeetingSideBar()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const [fetching, setFetching] = useState(false)

	const handleParticipantResponded = useCallback((receiverId: string) => {
		setMessages((prev) => {
			return prev.map((m) => {
				const senderId = m.messageContent.senderId
				if (senderId === receiverId) m.action = undefined
				return m
			})
		})
	}, [])

	const fetchReject = useCallback(
		async (receiverId: string) => {
			if (fetching) return
			setFetching(true)
			ParticipantApi.rejectParticipantJoinMeeting({
				meetingId,
				participantIds: [receiverId],
			})
				.then(() => handleParticipantResponded(receiverId))
				.finally(() => setFetching(false))
		},
		[meetingId, fetching]
	)

	const fetchAccept = useCallback(
		async (receiverId: string) => {
			if (fetching) return
			setFetching(true)
			ParticipantApi.accpectParticipantJoinMeeting({
				meetingId,
				participantIds: [receiverId],
			})
				.then(() => handleParticipantResponded(receiverId))
				.finally(() => setFetching(false))
		},
		[meetingId, fetching]
	)

	const sendMessage = useCallback(
		async (content) => {
			if (!hostChatRoom) return
			const { roomId, roomType } = hostChatRoom
			await ParticipantApi.sendMessage({ roomId, roomType, content })
		},
		[hostChatRoom]
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
		},
		[hidden]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDto) => {
			if (!hostChatRoom) return
			const sender = getSenderInRoom(payload.senderId, hostChatRoom)
			if (!sender) return
			const newMessage = messageCardFromSender(sender, payload.content, {
				reject: () => fetchReject(sender.id),
				accept: () => fetchAccept(sender.id),
			})
			pushMessage(newMessage)
		},
		[hostChatRoom, pushMessage, fetchReject, fetchAccept]
	)

	useLayoutEffect(() => {
		if (!hostChatRoom) return
		const listener = new WebRTCListenerFactory(hostChatRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)

		return () => {
			hostChatRoom.disconnect()
			listener.removeAllListeners()
		}
	}, [hostChatRoom])

	if (!hostChatRoom) return <Loading />
	return (
		<ChatBox
			onSend={sendMessage}
			title={'Waiting Chat (Host)'}
			messages={messages}
		/>
	)
}

WaitingChatOfHostTab.Icon = () => {
	return (
		<Badge badgeContent={80} color="primary">
			<Chat />
		</Badge>
	)
}

const waitingChatOfHostTab: IMeetingControlTab = {
	Icon: WaitingChatOfHostTab.Icon,
	Tab: WaitingChatOfHostTab,
}
export default waitingChatOfHostTab
