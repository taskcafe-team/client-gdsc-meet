import { Chat } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sheet, Stack, Badge, IconButton, Tooltip } from '@mui/joy'
import MeetingChatBox from 'views/containers/meeting/tabs/MeetingChatTab'
import { RoomType } from 'api/webrtc/webRTCTypes'
import PeopleIcon from '@mui/icons-material/People'
import { ParticipantRole } from '../../../api/http-rest/participant/participantDtos'

import HostWaitingChatTab from 'views/containers/meeting/tabs/HostWaitingChatTab'
import { MeetingContext } from 'views/containers/meeting/MeetingContext'
import ParticipantControlTab from 'views/containers/meeting/tabs/ParticipantControlTab'

enum ControlTabs {
	MEETING_CHAT = 'meeting chat',
	WAITING_CHAT = 'waiting chat',
	PARTICIPANT_CONTROL = 'participant control',
}

export default function MeetingControlBar() {
	const { roomConnections } = useContext(MeetingContext)
	const meetingRoom = useMemo(() => {
		const room = roomConnections.get(RoomType.MEETING)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)

		if (!room || !participants || !localParticipant) return null
		return {
			roomType: RoomType.MEETING,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.MEETING)])
	if (!meetingRoom) return <Navigate to="/" />

	const [showBar, setShowBar] = useState(false)
	const [currentTab, setCurrentTab] = useState(ControlTabs.MEETING_CHAT)
	const [unreadMessages, setUnreadMessages] = useState<
		Map<ControlTabs, number>
	>(new Map())

	const onUnreadMessagesChange = useCallback((n: number, tab: ControlTabs) => {
		setUnreadMessages((prev) => {
			prev.set(tab, n)
			return new Map(prev)
		})
	}, [])

	const toggleTab = useCallback(
		(tab: ControlTabs) => {
			if (tab === currentTab) setShowBar(!showBar)
			else {
				setCurrentTab(tab)
				setShowBar(true)
			}
		},
		[currentTab, showBar]
	)

	const getTabs = useCallback(
		(role: ParticipantRole) => {
			const getVariant = (tab: ControlTabs) =>
				showBar && tab == currentTab ? 'solid' : 'soft'
			const getBadge = (tab: ControlTabs) => unreadMessages.get(tab) ?? 0
			const buttonSx = { width: '30px', height: '30px' }
			const getHidden = (tab: ControlTabs) =>
				!showBar || tab !== currentTab ? true : false

			const meetingSideBarTabs = [
				{
					id: ControlTabs.MEETING_CHAT,
					title: ControlTabs.MEETING_CHAT,
					permission: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
					icon: (
						<IconButton
							variant={getVariant(ControlTabs.MEETING_CHAT)}
							sx={buttonSx}
							onClick={() => toggleTab(ControlTabs.MEETING_CHAT)}
						>
							<Badge
								badgeContent={getBadge(ControlTabs.MEETING_CHAT)}
								size="sm"
							>
								<Chat />
							</Badge>
						</IconButton>
					),
					component: (
						<MeetingChatBox
							onUnreadMessagesChange={(n) => {
								onUnreadMessagesChange(n, ControlTabs.MEETING_CHAT)
							}}
							hidden={getHidden(ControlTabs.MEETING_CHAT)}
						/>
					),
				},
				{
					id: ControlTabs.WAITING_CHAT,
					title: ControlTabs.WAITING_CHAT,
					permission: [ParticipantRole.HOST],
					icon: (
						<IconButton
							variant={getVariant(ControlTabs.WAITING_CHAT)}
							sx={buttonSx}
							onClick={() => toggleTab(ControlTabs.WAITING_CHAT)}
						>
							<Badge
								badgeContent={getBadge(ControlTabs.WAITING_CHAT)}
								size="sm"
							>
								<Chat />
							</Badge>
						</IconButton>
					),
					component: (
						<HostWaitingChatTab
							onUnreadMessagesChange={(n) => {
								onUnreadMessagesChange(n, ControlTabs.WAITING_CHAT)
							}}
							hidden={getHidden(ControlTabs.WAITING_CHAT)}
						/>
					),
				},
				{
					id: ControlTabs.PARTICIPANT_CONTROL,
					title: ControlTabs.PARTICIPANT_CONTROL,
					permission: [ParticipantRole.HOST],
					icon: (
						<IconButton
							variant={getVariant(ControlTabs.PARTICIPANT_CONTROL)}
							sx={buttonSx}
							onClick={() => toggleTab(ControlTabs.PARTICIPANT_CONTROL)}
						>
							<PeopleIcon />
						</IconButton>
					),
					component: (
						<ParticipantControlTab
							hidden={getHidden(ControlTabs.PARTICIPANT_CONTROL)}
						/>
					),
				},
			]

			return meetingSideBarTabs.filter((tab) => tab.permission.includes(role))
		},
		[toggleTab, unreadMessages]
	)
	const tabs = useMemo(
		() => getTabs(meetingRoom.localParticipant.role),
		[getTabs]
	)

	return (
		<Stack direction="row" height={1}>
			<Sheet
				variant="plain"
				sx={{
					mr: 2,
					overflow: 'hidden',
					height: 1,
					width: 350,
					borderRadius: 15,
					p: 1,
					display: showBar ? undefined : 'none',
				}}
			>
				{tabs.map((tab, i) => {
					return <React.Fragment key={i}>{tab.component}</React.Fragment>
				})}
			</Sheet>

			<Sheet
				variant="plain"
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
					variant="soft"
					sx={{ width: '30px', height: '30px' }}
				>
					<MenuIcon />
				</IconButton>

				{tabs.map((tab, i) => {
					return (
						<Tooltip key={i} title={tab.title} placement="left">
							{tab.icon}
						</Tooltip>
					)
				})}
			</Sheet>
		</Stack>
	)
}
