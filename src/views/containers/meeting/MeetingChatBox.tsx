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
import { LocalParticipant, RemoteParticipant, Room } from 'livekit-client'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import ParticipantApi from 'api/http-rest/participant/participantApi'

type WaitingChatBoxProps = {
	webrtcListener: WebRTCListenerFactory<RegisterActionsType>
	room: Room
	onMessageChange?: (messages: ChatMessageCardProps[]) => void
}

export default function MeetingChatBox({
	webrtcListener,
	room,
	onMessageChange,
}: WaitingChatBoxProps) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />
	const [messages, setMessages] = useState<ChatMessageCardProps[]>([])
	const [newMess, setNewMess] = useState('')
	const [sending, setSending] = useState(false)

	const sendMessage = useCallback(async () => {
		if (newMess.length === 0) return
		setSending(true)
		await ParticipantApi.sendMessage({
			roomId: meetingId,
			roomType: RoomType.MEETING,
			content: newMess,
		}).finally(() => {
			setNewMess('')
			setSending(false)
		})
	}, [newMess])

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
			const localId = room.localParticipant.identity
			let sender = room.getParticipantByIdentity(payload.senderId)
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
		[pushMessage, room]
	)

	useLayoutEffect(() => {
		if (onMessageChange) onMessageChange(messages)
	}, [messages])

	useEnhancedEffect(() => {
		webrtcListener.on(
			SendMessageActionEnum.ParticipantSendMessage,
			listenSendMessage
		)
	}, [webrtcListener])

	return (
		<Stack height={1} overflow="hidden">
			<Sheet variant="outlined" sx={{ mb: 1, borderRadius: 10 }}>
				<Typography
					textAlign="center"
					variant="h6"
					fontWeight="bold"
					color="Highlight"
				>
					Meeting Chat
				</Typography>
			</Sheet>
			<Stack flex={1} overflow="hidden">
				<Box
					height={1}
					sx={{
						overflowY: 'auto',
						'&::-webkit-scrollbar': { display: 'none' },
					}}
				>
					{messages.map((m, i) => (
						<ChatMessageCard key={i} {...m} />
					))}
				</Box>
			</Stack>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage()
				}}
			>
				<Stack direction="row">
					<Input
						value={newMess}
						onChange={(e) => setNewMess(e.target.value)}
						placeholder="Input message here"
						sx={{ borderRadius: 10, mr: 0.5 }}
					/>
					<IconButton disabled={sending} size="sm" type="submit" variant="soft">
						{(sending && <CircularProgress />) || <SendRoundedIcon />}
					</IconButton>
				</Stack>
			</form>
		</Stack>
	)
}
