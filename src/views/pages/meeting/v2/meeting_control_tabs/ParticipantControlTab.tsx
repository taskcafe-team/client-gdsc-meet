import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Typography from '@mui/joy/Typography'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { People } from '@mui/icons-material'
import { Badge, Stack } from '@mui/joy'
import { IMeetingControlTab } from '../../types'
import { useMeetingSideBar } from '../MeetingSideBarProvider'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'

const ListOnlineParticipants = lazy(() => import('./ListOnlineParticipants'))
const ListWaitingParticipants = lazy(() => import('./ListWaitingParticipants'))

function ParticipantControlTab() {
	const { localParticipant } = useMeeting()
	if (!localParticipant) throw new Error('ParticipantControlTab error')
	const isHost = localParticipant.role === ParticipantRole.HOST

	return (
		<Stack gap={1}>
			<Stack direction="row" alignItems="center" spacing={1}>
				<IconButton size="sm" variant="outlined">
					--
				</IconButton>
				<Typography level="title-lg">Participant Control</Typography>
			</Stack>
			<Input
				size="sm"
				startDecorator={<SearchRoundedIcon />}
				placeholder="Find Participant"
			/>
			<Stack>
				<List
					size="sm"
					sx={{
						gap: 1,
						'--ListItem-radius': (theme) => theme.vars.radius.sm,
					}}
				>
					<ListItem nested>
						<ListOnlineParticipants />
					</ListItem>
					{isHost && (
						<ListItem nested>
							<ListWaitingParticipants />
						</ListItem>
					)}
				</List>
			</Stack>
		</Stack>
	)
}

function ParticipantControlIcon() {
	return (
		<Badge badgeContent={0} color="primary">
			<People />
		</Badge>
	)
}

const participantControlTab: IMeetingControlTab = {
	Icon: ParticipantControlIcon,
	Tab: ParticipantControlTab,
}

export default participantControlTab
