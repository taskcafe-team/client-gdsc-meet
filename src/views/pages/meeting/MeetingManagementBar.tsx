import {
	LocalParticipant,
	RemoteParticipant,
	Room,
	RoomEvent,
} from 'livekit-client'
import { Box, Drawer, Sheet } from '@mui/joy'
import ChatBox from 'views/containers/meeting/ChatBox'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'

import { ChatMessageCardProps } from 'views/containers/meeting/ChatMessageCard'
import { ParticipantMetadata } from 'api/webrtc/webRTCTypes'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'

interface MeetingManagementProps {
	room: Room
}
// MeetingManagement
export default function MeetingManagementBar({ room }: MeetingManagementProps) {
	const webrtcListener = useMemo(() => new WebRTCListenerFactory(room), [room])

	const [messages, setMeessage] = useState<ChatMessageCardProps[]>([])
	const [open, setOpen] = React.useState(true)

	// Listion Action of Meeting
	const register = useCallback(async () => {
		webrtcListener.on(
			SendMessageActionEnum.ParticipantSendMessage,
			(payload) => {
				const localParticipantId = room.localParticipant.identity
				let sender: LocalParticipant | RemoteParticipant | undefined = undefined
				if (payload.sendby == localParticipantId) sender = room.localParticipant
				else sender = room.participants.get(payload.sendby)
				if (!sender) return

				const position =
					localParticipantId === sender.identity ? 'right' : 'left'
				const newMessage: ChatMessageCardProps = {
					position,
					messageContent: {
						senderId: sender.identity,
						name: sender.name || 'No name',
						avatar: '',
						contents: [payload.message],
					},
				}

				setMeessage((pre) => {
					const lastmess = pre[pre.length - 1]
					const lastSenderId = lastmess ? lastmess.messageContent.senderId : ''
					const currentSenderId = newMessage.messageContent.senderId
					if (lastSenderId === currentSenderId)
						lastmess.messageContent.contents.push(payload.message)
					else pre.push(newMessage)
					return pre
				})
			}
		)

		// webrtcListener.on(
		// 	SendMessageActionEnum.ParticipantRequestJoin,
		// 	(payload) => {
		// 		console.log(payload)
		// 	}
		// )

		// room.on(RoomEvent.ParticipantConnected, (p) => {
		// 	setParticipant((s) => {
		// 		s.set(p.identity, p)
		// 		return s
		// 	})
		// })

		// room.on(RoomEvent.ParticipantDisconnected, (p) => {
		// 	if (participants.has(p.identity))
		// 		setParticipant((s) => {
		// 			s.delete(p.identity)
		// 			return s
		// 		})
		// })

		// room.on(RoomEvent.ParticipantMetadataChanged, (metadata, p) => {
		// 	if (participants.has(p.identity))
		// 		setParticipant((s) => {
		// 			s.set(p.identity, p)
		// 			return s
		// 		})
		// })

		// room.on(RoomEvent.ParticipantNameChanged, (name, p) => {
		// 	if (participants.has(p.identity))
		// 		setParticipant((s) => {
		// 			s.set(p.identity, p)
		// 			return s
		// 		})
		// })

		// room.on(RoomEvent.ParticipantPermissionsChanged, (prevPermissions, p) => {
		// 	if (participants.has(p.identity))
		// 		setParticipant((s) => {
		// 			s.set(p.identity, p)
		// 			return s
		// 		})
		// })

		return
	}, [room])

	useLayoutEffect(() => {
		register()
	}, [])

	return (
		<Drawer
			size="md"
			variant="plain"
			open={open}
			onClose={() => setOpen(false)}
			slotProps={{
				content: {
					sx: {
						bgcolor: 'transparent',
						p: { md: 3, sm: 0 },
						boxShadow: 'none',
					},
				},
			}}
			anchor="right"
		>
			<Sheet sx={{ borderRadius: 'md', p: 2, height: 1 }}>
				<ChatBox messages={messages} />
			</Sheet>
		</Drawer>
	)
}
