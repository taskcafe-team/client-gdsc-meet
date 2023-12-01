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
	convertMessageCardFromSender,
	getSenderInMeeting,
} from 'views/pages/meeting/utils'
import {
	WebRTCService,
	createSendDataMessageAction,
} from 'api/webrtc/webRTCService'
import { AccessPermissionsStatus } from 'api/http-rest/participant/participantDtos'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { RoomApi } from 'api/http-rest/room/roomApi'

function WaitingChatOfHostTab() {
	const { meetingId, localParticipant, roomList } = useMeeting()
	const waitingRoom = roomList.get(RoomType.WAITING)
	if (!waitingRoom || !localParticipant)
		throw new Error('MeetingChatTab is not available')

	const navigate = useNavigate()
	const { hidden, setUnreadWaitingMessges, currentTab } = useMeetingSideBar()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [fetching, setFetching] = useState(false)

	useEffect(() => {
		if (!hidden && currentTab === 'waiting_chat') setUnreadWaitingMessges(0)
	}, [hidden, currentTab])

	const handleRespondRequest = async (
		partId: string,
		status: AccessPermissionsStatus
	) => {
		if (fetching) return
		setFetching(true)
		const req = { partIds: [partId], status }
		await ParticipantApi.respondRequestJoinMeeting(meetingId, req)
			.then(() =>
				setMessages((p) => p.map((m) => ({ ...m, action: undefined })))
			)
			.catch(() => console.log('Respond Fail'))
			.finally(() => setFetching(false))
	}

	const getSenderWithIsLocal = (senderId: string) => {
		const localPart = localParticipant
		const remoteParts = waitingRoom.remoteParticipants
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

	const createAndPushMessage = (senderId: string, content: string) => {
		const sender = getSenderWithIsLocal(senderId)
		const newMessage = convertMessageCardFromSender(sender, content)

		//local is host
		if (!sender.isLocal)
			newMessage.action = {
				accept: () => handleRespondRequest(sender.id, 'accept'),
				reject: () => handleRespondRequest(sender.id, 'reject'),
			}

		pushMessage(newMessage)
		setUnreadWaitingMessges((prev) => {
			if (!hidden && currentTab === 'waiting_chat') return 0
			else return prev + 1
		})
	}

	const sendMessage = (content) => {
		const senderId = localParticipant.id
		WebRTCService.sendDataMessage(waitingRoom.originalRoom, {
			action: createSendDataMessageAction(
				SendMessageActionEnum.ParticipantSendMessage,
				{ senderId, content }
			),
		}).then(() => createAndPushMessage(senderId, content))
	}

	const listenSendMessage = (payload: ParticipantSendMessageDto) =>
		createAndPushMessage(payload.senderId, payload.content)

	const connectRoom = () => {
		const { roomId } = waitingRoom
		return RoomApi.getAccessToken(meetingId, roomId)
			.then((res) => waitingRoom.connect(res.data.token))
			.catch(() => navigate('/'))
	}

	useEffect(() => {
		connectRoom()
		const listener = new WebRTCListenerFactory(waitingRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
			waitingRoom.disconnect()
		}
	}, [])

	return (
		<ChatBox
			onSend={sendMessage}
			title={'Waiting Chat (Host)'}
			messages={messages}
		/>
	)
}

WaitingChatOfHostTab.Icon = () => {
	const { unreadWaitingMessges } = useMeetingSideBar()
	return (
		<Badge badgeContent={unreadWaitingMessges} color="primary">
			<Chat />
		</Badge>
	)
}

const waitingChatOfHostTab: IMeetingControlTab = {
	Icon: WaitingChatOfHostTab.Icon,
	Tab: WaitingChatOfHostTab,
}
export default waitingChatOfHostTab
