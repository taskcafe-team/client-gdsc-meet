import GlobalStyles from '@mui/joy/GlobalStyles'
import {
	Stack,
	Sheet,
	IconButton,
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Tooltip,
	Chip,
} from '@mui/joy'
import MeetingSideBarProvider, {
	useMeetingSideBar,
} from './MeetingSideBarProvider'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import ParticipantControlTab from './meeting_control_tabs/ParticipantControlTab'
import MeetingChatTab from './meeting_control_tabs/MeetingChatTab'
import { IMeetingControlTab, MeetingTabControl } from '../types'
import WaitingChatOfHostTab from './meeting_control_tabs/WaitingChatOfHostTab'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded'
import SummaryTab from './meeting_control_tabs/SummaryTab'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { CardHeader } from '@mui/material'
import NotificationKeyWord from 'views/containers/meeting/components/NotificationKeyWord'
import useIsMobile from 'hooks/useIsMobile'
type IMeetingControlTabs = {
	title: string
	type: MeetingTabControl
	roles: ParticipantRole[]
	RefComponent: IMeetingControlTab
}[]

function MeetingSideBar() {
	const { localParticipant, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.WAITING)
	if (!meetingRoom || !localParticipant)
		throw new Error('MeetingSideBar is not available')
	const { hidden, setHidden, currentTab, setCurrentTab } = useMeetingSideBar()
	const isMobile = useIsMobile()

	const handleClickTabIcon = (tab: MeetingTabControl) => {
		return () => setCurrentTab(tab)
	}

	const getTabs = useCallback(() => {
		if (!localParticipant) return []
		const meetingTabs: IMeetingControlTabs = [
			{
				title: 'Meeting Chat',
				type: 'meeting_chat',
				roles: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
				RefComponent: MeetingChatTab,
			},
			{
				title: 'Participant Control',
				type: 'participant_control',
				roles: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
				RefComponent: ParticipantControlTab,
			},
			{
				title: 'Waiting Chat',
				type: 'waiting_chat',
				roles: [ParticipantRole.HOST],
				RefComponent: WaitingChatOfHostTab,
			},
			{
				title: 'Summary Keywords',
				type: 'summary_keyword',
				roles: [ParticipantRole.HOST, ParticipantRole.PARTICIPANT],
				RefComponent: SummaryTab,
			},
		]

		const filterfc = (tab) => tab.roles.includes(localParticipant.role)
		return meetingTabs.filter(filterfc)
	}, [meetingRoom])
	const tabs = useMemo(() => getTabs(), [getTabs])

	return (
		<Stack position="relative">
			<Box
				display={hidden ? 'block' : 'none'}
				sx={{ m: 2, position: 'absolute', left: 0, bottom: 0, zIndex: 99 }}
			>
				<Sheet sx={{ borderRadius: 'sm' }}>
					<IconButton
						onClick={() => setHidden((p) => !p)}
						children={<LoginRoundedIcon />}
					/>
				</Sheet>
			</Box>

			<GlobalStyles
				styles={(theme) => ({
					':root': {
						'--SideNavigation-slideIn': hidden ? 0 : 1,
						'--Sidebar-width': '350px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '380px',
						},
					},
				})}
			/>
			<Stack
				direction="row"
				sx={{
					position: { xs: 'fixed', md: 'sticky' },
					transform: `translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))`,
					transition: 'transform 0.4s, width 0.4s',
					zIndex: 100,
					height: '100dvh',
					width: hidden ? 0 : 'var(--Sidebar-width)',
					overflow: 'hidden',
				}}
			>
				<Sheet
					sx={{
						zIndex: 101,
						height: 1,
						py: 2,
						px: 1,
						borderRight: 1,
						borderColor: 'divider',
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
					}}
				>
					{tabs.map((item, i) => {
						const _hidden = hidden || item.type !== currentTab
						const changeTab = handleClickTabIcon(item.type)
						return (
							<IconButton
								key={i}
								variant={_hidden ? 'soft' : 'solid'}
								sx={{
									backgroundColor: _hidden ? '' : '#2870EA',
									transition: 'all 0.2s',
								}}
								onClick={changeTab}
								children={<item.RefComponent.Icon />}
							/>
						)
					})}
					<IconButton
						sx={{ mt: 'auto' }}
						onClick={() => setHidden((p) => !p)}
						children={<FirstPageRoundedIcon />}
					/>
				</Sheet>

				<Sheet sx={{ p: 2, flex: 1, display: 'flex' }}>
					{tabs.map((item, i) => {
						const _hidden = hidden || item.type !== currentTab
						return (
							<Box
								flex={1}
								key={i}
								display={_hidden ? 'none' : undefined}
								children={<item.RefComponent.Tab />}
							/>
						)
					})}
				</Sheet>
			</Stack>
			<Box
				sx={{
					position: 'absolute',
					top: isMobile ? 'auto' : 2,
					bottom: isMobile ? 10 : 'auto',
					right: -2,
					zIndex: isMobile ? 999 : 9,
					transform: 'translateX(+100%)',
					padding: 1,
					maxWidth: '350px',
					minWidth: '350px',
				}}
			>
				<NotificationKeyWord />
			</Box>
		</Stack>
	)
}

export default function MeetingSideBarWapper() {
	return (
		<MeetingSideBarProvider>
			<MeetingSideBar />
		</MeetingSideBarProvider>
	)
}
