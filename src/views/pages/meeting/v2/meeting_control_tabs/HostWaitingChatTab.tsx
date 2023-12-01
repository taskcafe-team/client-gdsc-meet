import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDto, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from 'views/containers/meeting/components/ChatMessageCard'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import {
	convertMessageCardFromSender,
	getSenderInMeeting,
} from 'views/pages/meeting/utils'
import { RoomApi } from 'api/http-rest/room/roomApi'
import { Loading } from 'views/routes/routes'
import {
	WebRTCService,
	createSendDataMessageAction,
} from 'api/webrtc/webRTCService'
import { useMeetingSideBar } from '../MeetingSideBarProvider'
import ChatBox from 'views/containers/meeting/components/ChatBox'

export default function HostWaitingChatTab() {
	const { meetingId, localParticipant, roomList } = useMeeting()
	const waitingRoom = roomList.get(RoomType.WAITING)
	if (!waitingRoom || !localParticipant)
		throw new Error('HostWaitingChatTab is not available')
	const navigate = useNavigate()
	const { hidden, currentTab, setUnreadWaitingMessges } = useMeetingSideBar()

	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
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

	useEffect(() => {
		const listener = new WebRTCListenerFactory(waitingRoom.originalRoom)
		listener.on(SendMessageActionEnum.ParticipantSendMessage, listenSendMessage)
		return () => {
			listener.removeAllListeners()
		}
	}, [])

	const connectRoom = () => {
		const { roomId } = waitingRoom
		return RoomApi.getAccessToken(meetingId, roomId)
			.then((res) => waitingRoom.connect(res.data.token))
			.catch(() => navigate('/'))
	}

	useEffect(() => {
		connectRoom()
		return () => {
			waitingRoom.disconnect()
		}
	}, [])

	if (waitingRoom.state !== 'connected') return <Loading />
	return (
		<ChatBox
			title={'Waiting Chat'}
			messages={messages}
			onSend={(c) => sendMessage(c)}
		/>
	)
}
