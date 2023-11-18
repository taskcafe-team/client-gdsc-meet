import { Box } from '@mui/joy'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from '../components/ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { Room, VideoPresets } from 'livekit-client'
import ChatBox from '../components/ChatBox'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import { MeetingContext } from '../MeetingContext'
import { Loading } from 'views/routes/routes'

type HostWaitingChatTabProps = {
	hidden?: boolean
	onUnreadMessagesChange?: (unreadMessages: number) => void
}

export default function HostWaitingChatTab({
	hidden = false,
	onUnreadMessagesChange,
}: HostWaitingChatTabProps) {
	const { meetingId, roomConnections, registerRoom } =
		useContext(MeetingContext)
	const chatRoom = useMemo(() => {
		const roomType = RoomType.WAITING

		const room = roomConnections.get(roomType)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)
		if (localParticipant?.role !== ParticipantRole.HOST) return null
		if (!room || !participants || !localParticipant) return null
		return {
			roomType,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.WAITING)])
	const navigate = useNavigate()

	const [loadingChatRoom, setLoadingChatRoom] = useState(true)
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [unreadMessages, setUnreadMessages] = useState(0)

	const [fetching, setFetching] = useState(false)

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
			if (hidden) setUnreadMessages((p) => p + 1)
			else setUnreadMessages(0)
		},
		[hidden]
	)

	const rejectParticipant = useCallback(
		async (participantId) => {
			if (fetching) return
			setFetching(true)
			await ParticipantApi.rejectParticipantJoinMeeting({
				meetingId,
				participantIds: [participantId],
			}).finally(() => setFetching(false))

			setMessages((prev) => {
				const s = prev.map((m) => {
					if (m.messageContent.senderId == participantId) m.action = undefined
					return m
				})
				return s
			})
		},
		[fetching]
	)

	const acceptParticipant = useCallback(
		async (participantId) => {
			if (fetching) return
			setFetching(true)
			const res = await ParticipantApi.accpectParticipantJoinMeeting({
				meetingId,
				participantIds: [participantId],
			}).finally(() => setFetching(false))

			setMessages((prev) => {
				const s = prev.map((m) => {
					if (m.messageContent.senderId == participantId) m.action = undefined
					return m
				})
				return s
			})
		},
		[fetching]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDto) => {
			if (!chatRoom) return
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

			if (sender.id !== chatRoom.localParticipantId)
				newMessage.action = {
					accept: () => acceptParticipant(sender.id),
					reject: () => rejectParticipant(sender.id),
				}

			pushMessage(newMessage)
		},
		[pushMessage, chatRoom, acceptParticipant, rejectParticipant]
	)

	const connectToChatRoom = useCallback(async () => {
		setLoadingChatRoom(true)
		const token = ParticipantApi.getMeetingApiToken({
			roomId: meetingId,
			roomType: RoomType.WAITING,
		})
		if (!token || token.length === 0) return navigate('/')

		const room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h540.resolution,
			},
		})

		await room
			.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
			.catch(() => navigate('/'))

		if (registerRoom) registerRoom(room, RoomType.WAITING)
		setLoadingChatRoom(false)
	}, [])

	useLayoutEffect(() => {
		onUnreadMessagesChange?.(unreadMessages)
	}, [unreadMessages])

	useLayoutEffect(() => {
		if (!hidden) setUnreadMessages(0)
	}, [hidden])

	useLayoutEffect(() => {
		if (!chatRoom) {
			connectToChatRoom()
			return
		}
		const listener = new WebRTCListenerFactory(chatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
		}
	}, [chatRoom, listenSendMessage])

	if (loadingChatRoom) return <Loading />
	if (!loadingChatRoom && !chatRoom) return <Navigate to="/" />
	return (
		<Box height={1} overflow="hidden" display={hidden ? 'none' : undefined}>
			<ChatBox
				title={'Waiting Chat'}
				messages={messages}
				onSend={(c) => sendMessage(c)}
			/>
		</Box>
	)
}
