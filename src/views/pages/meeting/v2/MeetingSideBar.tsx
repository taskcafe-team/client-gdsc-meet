import GlobalStyles from '@mui/joy/GlobalStyles'
import { Stack, Sheet, IconButton } from '@mui/joy'
import MeetingSideBarProvider, {
	useMeetingSideBar,
} from './MeetingSideBarProvider'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import ParticipantControlTab from './meeting_control_tabs/ParticipantControlTab'
import MeetingChatTab from './meeting_control_tabs/MeetingChatTab'
import { IMeetingControlTab, MeetingTabControl } from '../types'
import WaitingChatOfHostTab from './meeting_control_tabs/WaitingChatOfHostTab'
type IMeetingControlTabs = {
	title: string
	type: MeetingTabControl
	roles: ParticipantRole[]
	RefComponent: IMeetingControlTab
}[]

function MeetingSideBar() {
	const { hidden, currentTab, setCurrentTab } = useMeetingSideBar()

	const handleClickTabIcon = (tab: MeetingTabControl) => {
		return () => setCurrentTab(tab)
	}

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
			roles: [ParticipantRole.HOST],
			RefComponent: ParticipantControlTab,
		},
		{
			title: 'Waiting Chat',
			type: 'waiting_chat',
			roles: [ParticipantRole.HOST],
			RefComponent: WaitingChatOfHostTab,
		},
	]

	const tabs = meetingTabs

	return (
		<Stack direction="row">
			<GlobalStyles
				styles={(theme) => ({
					':root': {
						'--Sidebar-width': '300px',
						[theme.breakpoints.up('lg')]: {
							'--Sidebar-width': '350px',
						},
					},
				})}
			/>
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
							onClick={changeTab}
							children={<item.RefComponent.Icon />}
						/>
					)
				})}
			</Sheet>

			<Sheet
				className="Sidebar"
				sx={{
					position: { xs: 'fixed', md: 'sticky' },
					transform: {
						xs: `translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))`,
						md: 'none',
					},
					transition: 'transform 0.4s, width 0.4s',
					zIndex: 100,
					height: '100dvh',
					width: 'var(--Sidebar-width)',
					p: 2,
				}}
			>
				{tabs.map((item, i) => {
					const _hidden = hidden || item.type !== currentTab
					return (
						<Stack
							key={i}
							width={1}
							height={1}
							overflow="hidden"
							display={_hidden ? 'none' : undefined}
							children={<item.RefComponent.Tab />}
						/>
					)
				})}
			</Sheet>
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
