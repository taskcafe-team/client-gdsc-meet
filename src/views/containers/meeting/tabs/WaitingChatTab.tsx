import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import {
	ParticipantRequestJoinDto,
	ParticipantSendMessageDto,
	RoomType,
} from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from '../components/ChatMessageCard'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import ChatBox from '../components/ChatBox'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import { MeetingContext } from '../MeetingContext'
import { Button, Card, CardContent, Typography } from '@mui/joy'
import { Loading } from 'views/routes/routes'

const RejectedMessage = () => {
	const [countdown, setCountdown] = useState(10)
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1)
		}, 1000)

		if (countdown === 0) {
			clearInterval(timer)
			navigate('/')
		}

		return () => {
			clearInterval(timer)
		}
	}, [countdown])

	return (
		<Card>
			<div>
				<Typography level="title-lg">Rejected</Typography>
				<Typography level="body-sm">
					Your request to join this meeting has been rejected
				</Typography>
			</div>
			<CardContent orientation="horizontal">
				<div>
					<Typography level="body-xs">Return to home page after</Typography>
					<Typography fontSize="lg" fontWeight="lg">
						{countdown}s
					</Typography>
				</div>
				<Button
					variant="solid"
					size="md"
					color="primary"
					onClick={() => navigate('/')}
					sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
				>
					Go Home
				</Button>
			</CardContent>
		</Card>
	)
}

export default function WaitingChatTab() {
	const { meetingId, roomConnecteds, setMeetingState } =
		useContext(MeetingContext)
	const chatRoom = roomConnecteds.get(RoomType.WAITING)

	const navigate = useNavigate()
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [isRejected, setIsRejected] = useState(false)

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
			pushMessage(newMessage)
		},
		[chatRoom, getSender, pushMessage]
	)

	const listenResposedJoinRequest = useCallback(
		(payload: ParticipantRequestJoinDto) => {
			if (payload.status === RespondJoinStatus.REJECTED) {
				chatRoom?.room.disconnect()
				setIsRejected(true)
			} else if (payload.status === RespondJoinStatus.ACCEPTED) {
				const token = payload.token
				if (!token) return navigate('/')
				ParticipantApi.setMeetingApiToken(token)
				setMeetingState?.((pre) => ({ ...pre, currentRoom: RoomType.MEETING }))
			}
		},
		[chatRoom]
	)

	useLayoutEffect(() => {
		if (!chatRoom) return
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
	}, [chatRoom, listenSendMessage])

	if (isRejected) return <RejectedMessage />
	if (!chatRoom) return <Loading />
	return (
		<ChatBox
			title={'Waiting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}
