import {
	Avatar,
	Box,
	Button,
	Dropdown,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemButton,
	ListItemContent,
	ListItemDecorator,
	ListSubheader,
	Menu,
	MenuButton,
	MenuItem,
	Sheet,
	Stack,
	Typography,
} from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search'
import {
	ExpandLess,
	ExpandMore,
	KeyboardArrowRight,
	MoreVert,
} from '@mui/icons-material'

import { RoomType } from 'api/webrtc/webRTCTypes'
import { useMeetingState } from '../MeetingContext'
import { Collapse } from '@mui/material'
import { Loading } from 'views/routes/routes'
import ListWaitingParticipants from '../participant_control/ListWaitingParticipants'

export type ParticipantControlTabProps = {
	hidden?: boolean
}

export default function ParticipantControlTab({
	hidden,
}: ParticipantControlTabProps) {
	const { roomConnecteds } = useMeetingState()
	const meetingRoom = roomConnecteds.get(RoomType.MEETING)
	const waitingRoom = roomConnecteds.get(RoomType.WAITING)

	const [onlineParticipantOpen, setOnlineParticipantOpen] = useState(false)
	const [waitingParticipantOpen, setWaitingParticipantOpen] = useState(false)

	return (
		<Box height={1} overflow="hidden" display={hidden ? 'none' : undefined}>
			<Stack spacing={1} p={1}>
				<Stack>
					<Typography
						variant="outlined"
						textAlign="center"
						sx={{ m: 0, borderRadius: 10, p: 1 }}
						level="body-md"
						fontWeight="bold"
					>
						All Participant
					</Typography>
				</Stack>

				<Stack>
					<Input
						sx={{ borderRadius: 10 }}
						size="lg"
						startDecorator={<SearchIcon />}
						placeholder="Find Participant"
					/>
				</Stack>
				<Stack>
					<ListWaitingParticipants />
				</Stack>
			</Stack>
		</Box>
	)
}

const DropDown = () => {
	return (
		<Dropdown>
			<MenuButton
				slots={{ root: IconButton }}
				slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
			>
				<MoreVert />
			</MenuButton>
			<Menu>
				<MenuItem>Kick</MenuItem>
			</Menu>
		</Dropdown>
	)
}
