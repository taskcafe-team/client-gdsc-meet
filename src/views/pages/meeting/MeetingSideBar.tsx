import { Chat } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Sheet, Stack, Badge, IconButton, Tooltip, Box } from '@mui/joy'
import { Room } from 'livekit-client'
import WaitingChatBox from 'views/containers/meeting/WaitingChatBox'
import MeetingChatBox from 'views/containers/meeting/MeetingChatBox'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { ChatMessageCardProps } from 'views/containers/meeting/ChatMessageCard'
import {
	ParticipantRole,
	ParticipantUsecaseDTO,
} from '../../../api/http-rest/participant/participantDTOs'

import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import HostWaitingChatBox from 'views/containers/meeting/HostWaitingChatBox'
import { MeetingContext } from 'views/containers/meeting/MeetingContext'

enum ManagementTabs {
	MEETING_CHAT = 'meeting chat',
	WAITING_CHAT = 'waiting chat',
}

export default function MeetingSideBar() {
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
	const [currentTab, setCurrentTab] = useState(ManagementTabs.MEETING_CHAT)
	// const [unreadMessages, setUnreadMessages] = useState<
	// 	Map<ManagementTabs, number>
	// >(new Map())

	const getTabs = useCallback((role: ParticipantRole) => {
		const MeetingSideBarTab = [
			{
				title: ManagementTabs.MEETING_CHAT,
				icon: <Chat />,
				permission: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
				component: <MeetingChatBox />,
			},
			{
				title: ManagementTabs.WAITING_CHAT,
				icon: <Chat />,
				permission: [ParticipantRole.HOST],
				component: <HostWaitingChatBox />,
			},
		]

		return MeetingSideBarTab.filter((tab) => tab.permission.includes(role))
	}, [])
	const tabs = useMemo(
		() => getTabs(meetingRoom.localParticipant.role),
		[meetingRoom.localParticipant]
	)

	// const chatBoxChangeMessage = useCallback(
	// 	(chatTab: ManagementTabs, messages: ChatMessageCardProps[]) => {
	// 		if (!showBar)
	// 			setUnreadMessages((prev) => {
	// 				prev.set(chatTab, prev.get(chatTab) ? prev.get(chatTab)! + 1 : 0)
	// 				return new Map(prev)
	// 			})
	// 		else
	// 			setUnreadMessages((prev) => {
	// 				prev.set(chatTab, 0)
	// 				return new Map(prev)
	// 			})
	// 	},
	// 	[unreadMessages]
	// )

	const toggleTab = (tab: ManagementTabs) => {
		if (tab === currentTab) setShowBar(!showBar)
		else {
			setCurrentTab(tab)
			setShowBar(true)
		}
	}

	return (
		<Stack direction="row" height={1}>
			<Sheet
				variant="soft"
				sx={{
					backgroundColor: '#111',
					overflow: 'hidden',
					height: 1,
					borderRadius: 15,
					p: 1,
					ml: 0.5,
					display: showBar ? undefined : 'none',
				}}
			>
				{tabs.map((tab, i) => {
					return (
						<Box
							key={i}
							height={1}
							overflow="hidden"
							display={currentTab === tab.title ? undefined : 'none'}
						>
							{tab.component}
						</Box>
					)
				})}
			</Sheet>

			<Sheet
				variant="soft"
				sx={{
					backgroundColor: '#111',
					borderRadius: 15,
					p: 2,
					ml: 0.5,
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
						<Tooltip key={i} title={tab.title} variant="solid" placement="left">
							<IconButton
								variant={showBar && tab.title == currentTab ? 'solid' : 'soft'}
								sx={{ width: '30px', height: '30px' }}
								onClick={() => toggleTab(tab.title)}
							>
								<Badge badgeContent={1} size="sm">
									{tab.icon}
								</Badge>
							</IconButton>
						</Tooltip>
					)
				})}
			</Sheet>
		</Stack>
	)
}
