import { Box } from '@mui/joy'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from '../components/ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { Room, VideoPresets } from 'livekit-client'
import ChatBox from '../components/ChatBox'
import { useMeetingState } from '../MeetingContext'
import { Loading } from 'views/routes/routes'

type HostWaitingChatTabProps = {
	hidden?: boolean
	onUnreadMessagesChange: (unreadMessages: number) => void
}

export default function HostWaitingChatTab({
	hidden = false,
	onUnreadMessagesChange = () => {},
}: HostWaitingChatTabProps) {
	const { roomConnecteds, registerRoom, meetingId } = useMeetingState()
	const navigate = useNavigate()

	const hostChatRoom = roomConnecteds.get(RoomType.WAITING)
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [unreadMessages, setUnreadMessages] = useState(0)

	const [fetching, setFetching] = useState(false)

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
			if (!hostChatRoom) return
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
		[hostChatRoom, hidden]
	)

	const rejectParticipant = useCallback(
		async (participantId) => {
			if (!hostChatRoom) return
			if (fetching) return

			setFetching(true)
			await ParticipantApi.rejectParticipantJoinMeeting({
				meetingId: hostChatRoom.roomId,
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
		[hostChatRoom, fetching]
	)

	const acceptParticipant = useCallback(
		async (participantId) => {
			if (!hostChatRoom) return
			if (fetching) return
			setFetching(true)

			const res = await ParticipantApi.accpectParticipantJoinMeeting({
				meetingId: hostChatRoom.roomId,
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
		[hostChatRoom, fetching]
	)

	const getSender = useCallback(
		(id: string) => {
			if (!hostChatRoom) return null
			if (id === hostChatRoom.localParticipant.id)
				return { ...hostChatRoom.localParticipant, isLocal: true }
			else {
				const remoteParticipant = hostChatRoom.remoteParticipants.get(id)
				if (!remoteParticipant) return null
				else return { ...remoteParticipant, isLocal: false }
			}
		},
		[hostChatRoom]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDto) => {
			if (!hostChatRoom) return
			if (payload.roomType !== RoomType.WAITING) return
			const sender = getSender(payload.senderId)
			if (!sender) return

			const newMessage: ChatMessageCardProps = {
				position: sender.isLocal ? 'right' : 'left',
				messageContent: {
					senderId: sender.id,
					name: sender.name || 'No name',
					avatar: '',
					contents: [payload.content],
				},
			}

			if (!sender.isLocal)
				newMessage.action = {
					accept: () => acceptParticipant(sender.id),
					reject: () => rejectParticipant(sender.id),
				}

			pushMessage(newMessage)
		},
		[hostChatRoom, pushMessage, getSender, acceptParticipant, rejectParticipant]
	)

	const connectToChatRoom = useCallback(async () => {
		if (hostChatRoom) return
		const token = ParticipantApi.getMeetingApiToken({
			roomId: meetingId,
			roomType: RoomType.WAITING,
		})
		if (!token || token.length === 0) return navigate('/')

		const resolution = VideoPresets.h540.resolution
		const room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: { resolution },
		})

		await room
			.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
			.catch(() => navigate('/'))
		if (registerRoom) registerRoom(room, RoomType.WAITING)
	}, [hostChatRoom, registerRoom])

	useLayoutEffect(() => {
		onUnreadMessagesChange(unreadMessages)
	}, [unreadMessages])

	useLayoutEffect(() => {
		if (!hidden) setUnreadMessages(0)
	}, [hidden])

	useLayoutEffect(() => {
		if (!hostChatRoom) {
			connectToChatRoom()
			return
		}
		const listener = new WebRTCListenerFactory(hostChatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
		}
	}, [hostChatRoom, listenSendMessage])

	if (!hostChatRoom) return <Loading />
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
