import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDTO, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from './ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import ChatBox from './ChatBox'
import { MeetingContext } from './MeetingContext'

export default function MeetingChatBox() {
	const { meetingId, roomConnections } = useContext(MeetingContext)
	const chatRoom = useMemo(() => {
		const room = roomConnections.get(RoomType.MEETING)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)
		if (!room || !participants || !localParticipant) return null
		return {
			roomType: RoomType.MEETING,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.MEETING)])
	if (!chatRoom) return <Navigate to="/" />

	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const sendMessage = useCallback(async (content) => {
		await ParticipantApi.sendMessage({
			roomId: meetingId,
			roomType: chatRoom.roomType,
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
			if (payload.roomType !== RoomType.MEETING) return
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
		[pushMessage]
	)

	useLayoutEffect(() => {
		const listener = new WebRTCListenerFactory(chatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)

		return () => {
			listener.removeAllListeners()
		}
	}, [])

	return (
		<ChatBox
			title={'Meeting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}
