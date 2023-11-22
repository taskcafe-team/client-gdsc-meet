import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from '../components/ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import ChatBox from '../components/ChatBox'
import { Box } from '@mui/joy'
import { useMeetingState } from '../MeetingContext'
import { Loading } from 'views/routes/routes'

type MeetingChatTabProps = {
	hidden?: boolean
	onUnreadMessagesChange?: (unreadMessages: number) => void
}

export default function MeetingChatTab({
	hidden,
	onUnreadMessagesChange,
}: MeetingChatTabProps) {
	const { roomConnecteds } = useMeetingState()
	const chatRoom = roomConnecteds.get(RoomType.MEETING)

	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [unreadMessages, setUnreadMessages] = useState(0)

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
			if (hidden) setUnreadMessages((p) => p + 1)
			else setUnreadMessages(0)
		},
		[hidden]
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
			if (!chatRoom) return
			const sender = getSender(payload.senderId)
			if (!sender) return

			const newMessage: ChatMessageCardProps = {
				position: sender.isLocal ? 'right' : 'left',
				messageContent: {
					senderId: sender.id,
					name: sender.name || 'NO NAME',
					avatar: '',
					contents: [payload.content],
				},
			}
			pushMessage(newMessage)
		},
		[chatRoom, getSender, pushMessage]
	)

	useLayoutEffect(() => {
		if (onUnreadMessagesChange) onUnreadMessagesChange(unreadMessages) //TODO: Chua on
	}, [unreadMessages])

	useLayoutEffect(() => {
		if (!hidden) setUnreadMessages(0)
	}, [hidden])

	useLayoutEffect(() => {
		if (!chatRoom) return // TODO: Khoon phai o day
		const listener = new WebRTCListenerFactory(chatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)

		return () => {
			listener.removeAllListeners()
		}
	}, [chatRoom])

	return (
		<Box height={1} overflow="hidden" display={hidden ? 'none' : undefined}>
			{!chatRoom ? (
				<Loading />
			) : (
				<ChatBox
					title={'Meeting Chat'}
					messages={messages}
					onSend={(c) => sendMessage(c)}
				/>
			)}
		</Box>
	)
}
