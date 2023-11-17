import {
	Box,
	CircularProgress,
	IconButton,
	Input,
	Sheet,
	Stack,
} from '@mui/joy'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Typography } from '@mui/material'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import {
	RegisterActionsType,
	SendMessageActionEnum,
} from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import {
	ParticipantRequestJoinDTO,
	ParticipantSendMessageDTO,
	RoomType,
} from 'api/webrtc/webRTCTypes'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import { Room, VideoPresets } from 'livekit-client'
import useToastily from 'hooks/useToastily'
import ChatBox from './ChatBox'
import {
	ParticipantRole,
	ParticipantUsecaseDTO,
} from 'api/http-rest/participant/participantDTOs'
import { MeetingContext } from './MeetingContext'

const Loading = () => (
	<Stack justifyContent="center" alignItems="center" width={1} height={1}>
		<CircularProgress />
	</Stack>
)

export default function HostWaitingChatBox() {
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

	const rejectParticipant = useCallback(async (participantId) => {
		await ParticipantApi.rejectParticipantJoinMeeting({
			meetingId,
			participantIds: [participantId],
		})
	}, [])

	const acceptParticipant = useCallback(async (participantId) => {
		await ParticipantApi.accpectParticipantJoinMeeting({
			meetingId,
			participantIds: [participantId],
		})
	}, [])

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDTO) => {
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

			if (sender.role === ParticipantRole.HOST)
				newMessage.action = {
					accept: () => acceptParticipant(sender.id),
					reject: () => rejectParticipant(sender.id),
				}

			pushMessage(newMessage)
		},
		[pushMessage, chatRoom]
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
		if (!chatRoom) {
			connectToChatRoom()
			return
		}
		const listener = new WebRTCListenerFactory(chatRoom.room)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
		}
	}, [chatRoom])

	if (loadingChatRoom) return <Loading />
	if (!loadingChatRoom && !chatRoom) return <Navigate to="/" />
	return (
		<ChatBox
			title={'Waiting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}
