import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import { listItemButtonClasses } from '@mui/joy/ListItemButton'
import Typography from '@mui/joy/Typography'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { People } from '@mui/icons-material'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { Badge, Stack } from '@mui/joy'
import ListOnlineParticipants from './ListOnlineParticipants'
import ListWaitingParticipants from './ListWaitingParticipants'
import { IMeetingControlTab } from '../../types'

function ParticipantControlTab() {
	return (
		<Stack gap={1}>
			<Box
				className="Sidebar-overlay"
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					opacity: 'var(--SideNavigation-slideIn)',
					backgroundColor: 'var(--joy-palette-background-backdrop)',
					transition: 'opacity 0.4s',
					transform: {
						xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
						lg: 'translateX(-100%)',
					},
				}}
			/>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<IconButton size="sm" variant="outlined">
					--
				</IconButton>
				<Typography level="title-lg">Participant Control</Typography>
			</Box>
			<Input
				size="sm"
				startDecorator={<SearchRoundedIcon />}
				placeholder="Find Participant"
			/>
			<Box
				sx={{
					minHeight: 0,
					overflow: 'hidden auto',
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					[`& .${listItemButtonClasses.root}`]: { gap: 1.5 },
				}}
			>
				<List
					size="sm"
					sx={{
						gap: 1,
						'--List-nestedInsetStart': '30px',
						'--ListItem-radius': (theme) => theme.vars.radius.sm,
					}}
				>
					<ListItem nested>
						<ListOnlineParticipants />
					</ListItem>
					<ListItem nested>
						<ListWaitingParticipants />
					</ListItem>
				</List>
			</Box>
		</Stack>
	)
}

function ParticipantControlIcon() {
	const { getRoomConnected } = useMeeting()
	const meetingRoom = getRoomConnected('', RoomType.MEETING)
	const countParticipantWaiting = meetingRoom?.remoteParticipants.size ?? 0
	return (
		<Badge badgeContent={countParticipantWaiting} color="primary">
			<People />
		</Badge>
	)
}

const participantControlTab: IMeetingControlTab = {
	Icon: ParticipantControlIcon,
	Tab: ParticipantControlTab,
}

export default participantControlTab
