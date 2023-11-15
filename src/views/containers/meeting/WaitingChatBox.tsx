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
import { ParticipantSendMessageDTO, RoomType } from 'api/webrtc/webRTCTypes'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { Room, VideoPresets } from 'livekit-client'
import useToastily from 'hooks/useToastily'
import { Loading } from 'views/routes/routes'
import ChatBox from './ChatBox'

interface WaitingChatBoxProps {
	onMessageChange?: (messages: ChatMessageCardProps[]) => void
}

export default function WaitingChatBox({}: WaitingChatBoxProps) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />
	const navigate = useNavigate()

	const [chatRoom, setChatRoom] = useState<Room | null>(null)

	const toast = useToastily()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])

	const connectToChatRoom = useCallback(async () => {
		// Token in session storage
		const token = ParticipantApi.getMeetingApiToken({
			roomId: meetingId,
			roomType: RoomType.WAITING,
		})
		if (!token || token.length === 0) return navigate('/')

		const _room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h540.resolution,
			},
		})

		_room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
		setChatRoom(_room)
	}, [])

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
			console.log(payload)
			if (!chatRoom) return
			if (payload.roomType !== RoomType.WAITING) return
			const localId = chatRoom.localParticipant.identity
			let sender = chatRoom.getParticipantByIdentity(payload.senderId)
			if (!sender) return

			const newMessage: ChatMessageCardProps = {
				position: localId === sender.identity ? 'right' : 'left',
				messageContent: {
					senderId: sender.identity,
					name: sender.name || 'No name',
					avatar: '',
					contents: [payload.content],
				},
			}

			pushMessage(newMessage)
		},
		[pushMessage, chatRoom]
	)

	useLayoutEffect(() => {
		if (!chatRoom) connectToChatRoom()
		return () => {
			if (chatRoom) {
				chatRoom.disconnect()
				setChatRoom(null)
			}
		}
	}, [chatRoom])

	useLayoutEffect(() => {
		if (!chatRoom) return
		const listener = new WebRTCListenerFactory(chatRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
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
