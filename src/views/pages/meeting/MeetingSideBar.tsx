import { Chat } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sheet, Stack, Badge, IconButton, Tooltip, Box } from '@mui/joy'
import { Room, VideoPresets } from 'livekit-client'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import WaitingChatBox from 'views/containers/meeting/WaitingChatBox'
import MeetingChatBox from 'views/containers/meeting/MeetingChatBox'
import { ParticipantMetadata, RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from 'views/containers/meeting/ChatMessageCard'
import { ParticipantRole } from '../../../api/http-rest/participant/participantDTOs' //TODO: Fix Room Type
import { CreateTokenDTO } from 'api/http-rest/participant/participantApi'
import { MeetingType } from 'api/http-rest/meeting/meetingApiType' //TODO: Fix Room Type
import useToastily from 'hooks/useToastily'

enum ManagementTabs {
	WAITING_CHAT = 'WAITING_CHAT',
	MEETING_CHAT = 'MEETING_CHAT',
}

type MeetingSideBarProps = {
	participant: {
		id: string
		role: ParticipantRole
	}
	tokens: CreateTokenDTO[]
}

const getTabs = (role: ParticipantRole, tokens: CreateTokenDTO[]) => {
	const MeetingSideBarTab = [
		{
			id: 1,
			title: ManagementTabs.WAITING_CHAT,
			icon: <Chat />,
			permission: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
			component: WaitingChatBox,
		},
		{
			id: 2,
			title: ManagementTabs.MEETING_CHAT,
			icon: <Chat />,
			permission: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
			component: MeetingChatBox,
		},
	]

	return MeetingSideBarTab.filter((tab) => tab.permission.includes(role))
}

export default function MeetingSideBar({
	participant,
	tokens,
}: MeetingSideBarProps) {
	const isHost = useMemo(
		() => participant.role === ParticipantRole.HOST,
		[participant]
	)
	const role = useMemo(() => participant.role, [participant])
	const isWaitingRoom = useMemo(() => {
		if (tokens.length <= 0) return true
		return tokens.length > 1 ? false : tokens[0].roomType === RoomType.WAITING
	}, [tokens])

	const toast = useToastily()
	const [rooms, setRooms] = useState<Map<RoomType, Room>>(new Map())

	const [meetingRoom, setMeetingRoom] = useState<Room | null>(null)
	const [waitingRoom, setWaitingRoom] = useState<Room | null>(null)

	const connect = useCallback(async () => {
		const connectPromis = tokens.map(async (t) => {
			const _room = new Room({
				adaptiveStream: true,
				dynacast: true,
				videoCaptureDefaults: {
					resolution: VideoPresets.h540.resolution,
				},
			})

			await _room
				.connect(import.meta.env.API_WEBRTC_SOCKET_URL, t.roomToken)
				.catch(() => console.log('Connect Error'))
			await _room.localParticipant.enableCameraAndMicrophone()

			rooms.set(t.roomType, _room)
			setRooms(new Map(rooms))
		})
		Promise.all(connectPromis)
	}, [])

	useLayoutEffect(() => {
		connect()
	}, [connect])

	// const tokens = useMemo(() => {
	// 	const _t = new Map<RoomType, CreateTokenDTO>()
	// 	props.tokens.forEach((t) => _t.set(t.roomType, t))
	// 	return _t
	// }, [props])
	// const webrtcListener = useMemo(() => new WebRTCListenerFactory(room), [room])

	// // Local Participant Info
	// const metadata = useMemo(() => {
	// 	const meta = JSON.parse(room.localParticipant.metadata || '')
	// 	const metaObject = meta as ParticipantMetadata
	// 	return { ...metaObject }
	// }, [room])

	// const [tabs, setTabs] = useState(getTabs(metadata.role))
	const [showBar, setShowBar] = useState(true)
	const [currentTab, setCurrentTab] = useState(ManagementTabs.WAITING_CHAT)
	const [unreadMessages, setUnreadMessages] = useState<
		Map<ManagementTabs, number>
	>(new Map())

	const chatBoxChangeMessage = useCallback(
		(chatTab: ManagementTabs, messages: ChatMessageCardProps[]) => {
			if (!showBar)
				setUnreadMessages((prev) => {
					prev.set(chatTab, prev.get(chatTab) ? prev.get(chatTab)! + 1 : 0)
					return new Map(prev)
				})
			else
				setUnreadMessages((prev) => {
					prev.set(chatTab, 0)
					return new Map(prev)
				})
		},
		[unreadMessages]
	)

	const toggleTab = (tab: ManagementTabs) => {
		// Toggle Show Tab
		if (tab === currentTab) setShowBar(!showBar)
		else {
			setCurrentTab(tab)
			setShowBar(true)
		}
	}

	return (
		<Stack direction="row" spacing={1} height={1}>
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
				{role !== ParticipantRole.HOST}
				{/* {tabs.map((tab, i) => {
					return (
						<Box
							key={i}
							height={1}
							overflow="hidden"
							display={currentTab === tab.title ? undefined : 'none'}
						>
							<tab.component
								room={room}
								webrtcListener={webrtcListener}
								onMessageChange={(m) => chatBoxChangeMessage(tab.title, m)}
							/>
						</Box>
					)
				})} */}
			</Sheet>

			<Box>
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

					{/* {tabs.map((tab, i) => {
						return (
							<Tooltip
								key={i}
								title={tab.title}
								variant="solid"
								placement="left"
							>
								<IconButton
									variant={
										showBar && tab.title == currentTab ? 'solid' : 'soft'
									}
									sx={{ width: '40px', height: '40px' }}
									onClick={() => toggleTab(tab.title)}
								>
									<Badge
										badgeContent={unreadMessages.get(tab.title) || 0}
										size="sm"
									>
										{tab.icon}
									</Badge>
								</IconButton>
							</Tooltip>
						)
					})} */}
				</Sheet>
			</Box>
		</Stack>
	)
}
