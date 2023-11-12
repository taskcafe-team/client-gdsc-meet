import { Chat } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sheet, Stack, Badge, IconButton, Avatar, Tooltip, Box } from '@mui/joy'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { ParticipantSendMessageDTO } from 'api/webrtc/webRTCTypes'
import { LocalParticipant, RemoteParticipant, Room } from 'livekit-client'
import ChatBox from 'views/containers/meeting/ChatBox'
import { ChatMessageCardProps } from 'views/containers/meeting/ChatMessageCard'

enum ManagementTabs {
	Chat = 'chat',
	Participant = 'participant',
}

interface MeetingSideBarProps {
	room: Room
}
export default function MeetingSideBar({ room }: MeetingSideBarProps) {
	const webrtcListener = useMemo(() => new WebRTCListenerFactory(room), [room])

	const [showBar, setShowBar] = useState(true)
	const [currentTab, setCurrentTab] = useState(ManagementTabs.Chat)
	const [waitingChat, setWaitingChat] = useState<ChatMessageCardProps[]>([])
	const [countWaitMessOfWaitingChat, setCountWaitMessOfWaitingChat] =
		useState(0)

	const toggleTab = (tab: ManagementTabs) => {
		// Toggle Show Tab
		if (tab === currentTab) setShowBar(!showBar)
		else {
			setCurrentTab(tab)
			setShowBar(true)
		}

		// Handle when tab showed
		if (showBar)
			if (currentTab === ManagementTabs.Chat)
				setCountWaitMessOfWaitingChat((pre) => 0)
	}

	const getDisplayType = (tab: ManagementTabs) => {
		return currentTab === tab ? undefined : 'none'
	}

	const pushWaitingMessages = useCallback(
		(newMess: ChatMessageCardProps) => {
			setWaitingChat((prevChat) => {
				const length = prevChat.length

				if (length === 0) return [...prevChat, newMess]
				else {
					const lastmess = prevChat[length - 1]
					const lastSenderId = lastmess.messageContent.senderId
					const currentSenderId = newMess.messageContent.senderId

					if (lastSenderId === currentSenderId) {
						const contents = newMess.messageContent.contents
						lastmess.messageContent.contents.push(...contents)
						return [...prevChat.slice(0, length - 1), lastmess]
					} else return [...prevChat, newMess]
				}
			})

			if (showBar) {
				if (currentTab === ManagementTabs.Chat) setCountWaitMessOfWaitingChat(0)
			} else setCountWaitMessOfWaitingChat((prevCount) => prevCount + 1)
		},
		[waitingChat, currentTab, showBar]
	)

	const listenSendMessage = useCallback(
		(payload: ParticipantSendMessageDTO) => {
			const localId = room.localParticipant.identity
			let sender: LocalParticipant | RemoteParticipant | undefined = undefined
			if (payload.sendby == localId) sender = room.localParticipant
			else sender = room.participants.get(payload.sendby)
			if (!sender) return

			const newMessage: ChatMessageCardProps = {
				position: localId === sender.identity ? 'right' : 'left',
				messageContent: {
					senderId: sender.identity,
					name: sender.name || 'No name',
					avatar: '',
					contents: [payload.message],
				},
			}

			pushWaitingMessages(newMessage)
		},
		[room, pushWaitingMessages]
	)

	useEnhancedEffect(() => {
		webrtcListener.on(
			SendMessageActionEnum.ParticipantSendMessage,
			listenSendMessage
		)
	}, [webrtcListener])

	return (
		<Stack direction="row" spacing={1}>
			<Sheet
				variant="plain"
				sx={{
					overflow: 'hidden',
					height: 1,
					borderRadius: 15,
					p: 1,
					display: showBar ? undefined : 'none',
				}}
			>
				<Box display={getDisplayType(ManagementTabs.Chat)}>
					<ChatBox messages={waitingChat} />
				</Box>
			</Sheet>

			<Sheet
				sx={{
					borderRadius: 15,
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					'& button': { borderRadius: '50%', padding: 0 },
				}}
			>
				<IconButton
					onClick={() => setShowBar(!showBar)}
					variant="outlined"
					sx={{ width: '40px', height: '40px' }}
				>
					<MenuIcon />
				</IconButton>
				<Tooltip title="Chat" variant="solid" placement="left">
					<IconButton
						variant="soft"
						sx={{ width: '40px', height: '40px' }}
						onClick={() => toggleTab(ManagementTabs.Chat)}
					>
						<Badge badgeContent={countWaitMessOfWaitingChat} size="sm">
							<Chat />
						</Badge>
					</IconButton>
				</Tooltip>
			</Sheet>
		</Stack>
	)
}
