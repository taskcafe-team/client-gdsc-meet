import { Chat } from '@mui/icons-material'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import {
	ParticipantRequestJoinDto,
	ParticipantSendMessageDto,
	RoomType,
} from 'api/webrtc/webRTCTypes'
import { IMeetingControlTab } from 'views/pages/meeting/types'

import { useMeeting } from 'views/containers/meeting/MeetingContext'
import ChatBox from 'views/containers/meeting/components/ChatBox'
import { ChatMessageCardProps } from 'views/containers/meeting/components/ChatMessageCard'
import { Loading } from 'views/routes/routes'
import { messageCardFromSender } from 'views/pages/meeting/utils'

function WaitingChatOfParticipantTab() {
	const { meetingId, getRoomConnected } = useMeeting()

	const chatRoom = getRoomConnected('', RoomType.WAITING)
	const navigate = useNavigate()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const sendMessage = useCallback(
		async (content) => {
			await ParticipantApi.sendMessage({
				roomId: meetingId,
				roomType: RoomType.WAITING,
				content,
			})
		},
		[meetingId]
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
		[messages]
	)

	const getSender = useCallback(
		(id: string) => {
			if (!chatRoom) return null
			if (id === chatRoom.localParticipant.id)
				return { ...chatRoom.localParticipant, isLocal: true }
			else {
				const remoteParticipant = chatRoom.remoteParticipants.get(id)
				if (!remoteParticipant) return null
				else return { ...remoteParticipant, isLocal: false }
			}
		},
		[chatRoom]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDto) => {
			const sender = getSender(payload.senderId)
			if (!sender) return
			const newMessage = messageCardFromSender(sender, payload.content)
			pushMessage(newMessage)
		},
		[getSender, pushMessage]
	)

	useLayoutEffect(() => {
		if (!chatRoom) return
		const listener = new WebRTCListenerFactory(chatRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
	}, [chatRoom])

	if (!chatRoom) return <Loading />
	return (
		<ChatBox
			title={'Waiting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}

const waitingChatOfParticipantTab: IMeetingControlTab = {
	Icon: () => <Chat />,
	Tab: WaitingChatOfParticipantTab,
}
export default waitingChatOfParticipantTab
