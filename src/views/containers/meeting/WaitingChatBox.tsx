import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import {
	ParticipantRequestJoinDTO,
	ParticipantSendMessageDTO,
	RoomType,
} from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from './ChatMessageCard'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import ChatBox from './ChatBox'
import { ParticipantRole } from 'api/http-rest/participant/participantDTOs'
import { MeetingContext } from './MeetingContext'

export default function WaitingChatBox() {
	const { meetingId, roomConnections, setState } = useContext(MeetingContext)
	const chatRoom = useMemo(() => {
		const room = roomConnections.get(RoomType.WAITING)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)
		if (localParticipant?.role === ParticipantRole.HOST) return null
		if (!room || !participants || !localParticipant) return null
		return {
			roomType: RoomType.WAITING,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.WAITING)])
	if (!chatRoom) return <Navigate to="/" />

	const navigate = useNavigate()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const sendMessage = useCallback(async (content) => {
		await ParticipantApi.sendMessage({
			roomId: meetingId,
			roomType: RoomType.WAITING,
			content,
		})
	}, [])

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

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDTO) => {
			if (payload.roomType !== RoomType.WAITING) return
			const sender = chatRoom.participants.get(payload.senderId)
			if (!sender) return

			const newMessage: ChatMessageCardProps = {
				position: chatRoom.localParticipantId === sender.id ? 'right' : 'left',
				messageContent: {
					senderId: sender.id,
					name: sender.name || 'No name',
					avatar: '',
					contents: [payload.content],
				},
			}
			pushMessage(newMessage)
		},
		[pushMessage, chatRoom]
	)

	const listenResposedJoinRequest = useCallback(
		(payload: ParticipantRequestJoinDTO) => {
			if (payload.status === RespondJoinStatus.REJECTED) return navigate('/')
			else if (payload.status === RespondJoinStatus.ACCEPTED) {
				const token = payload.token
				if (!token) return navigate('/')
				ParticipantApi.setMeetingApiToken(token)
				setState?.((pre) => ({ ...pre, currentRoom: RoomType.MEETING }))
			}
		},
		[]
	)

	useLayoutEffect(() => {
		const listener = new WebRTCListenerFactory(chatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		listener.on(
			SendMessageActionEnum.ParticipantRequestJoin,
			listenResposedJoinRequest
		)

		return () => {
			listener.removeAllListeners()
			chatRoom.room.disconnect()
		}
	}, [chatRoom])

	return (
		<ChatBox
			title={'Waiting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}
