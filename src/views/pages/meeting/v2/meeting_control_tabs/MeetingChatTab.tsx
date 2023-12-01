import { Chat } from '@mui/icons-material'
import React from 'react'
import ChatBox from 'views/containers/meeting/components/ChatBox'
import { IMeetingControlTab } from '../../types'
import { useMeetingSideBar } from '../MeetingSideBarProvider'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ChatMessageCardProps } from 'views/containers/meeting/components/ChatMessageCard'
import { Badge } from '@mui/joy'
import {
	WebRTCService,
	createSendDataMessageAction,
} from 'api/webrtc/webRTCService'
import {
	convertMessageCardFromSender,
	getSenderInMeeting,
} from 'views/pages/meeting/utils'

function MeetingChatTab() {
	const { localParticipant, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	if (!meetingRoom || !localParticipant)
		throw new Error('MeetingChatTab is not available')

	const { hidden, setUnreadMeetingMessges, currentTab } = useMeetingSideBar()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const getSenderWithIsLocal = (senderId: string) => {
		const localPart = localParticipant
		const remoteParts = meetingRoom.remoteParticipants
		const sender = getSenderInMeeting(senderId, localPart, remoteParts)
		if (!sender) throw new Error('Sender is null')
		return sender
	}

	const pushMessage = (newMess: ChatMessageCardProps) => {
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
	}

	useEffect(() => {
		if (!hidden && currentTab === 'meeting_chat') setUnreadMeetingMessges(0)
	}, [hidden, currentTab])

	const createAndPushMessage = (senderId: string, content: string) => {
		const sender = getSenderWithIsLocal(senderId)
		const newMessage = convertMessageCardFromSender(sender, content)
		pushMessage(newMessage)
	}

	const sendMessage = (content) => {
		const senderId = localParticipant.id
		WebRTCService.sendDataMessage(meetingRoom.originalRoom, {
			action: createSendDataMessageAction(
				SendMessageActionEnum.ParticipantSendMessage,
				{ senderId, content }
			),
		}).then(() => createAndPushMessage(senderId, content))
	}

	const listenSendMessage = (payload: ParticipantSendMessageDto) =>
		createAndPushMessage(payload.senderId, payload.content)

	useEffect(() => {
		const listener = new WebRTCListenerFactory(meetingRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
		}
	}, [])

	return (
		<ChatBox onSend={sendMessage} title={'Meeting Chat'} messages={messages} />
	)
}

MeetingChatTab.Icon = () => {
	const { unreadMeetingMessges } = useMeetingSideBar()
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
