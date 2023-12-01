import Avatar from '@mui/joy/Avatar'
import Button from '@mui/joy/Button'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ListItemDecorator } from '@mui/joy'
import { RoomType } from 'api/webrtc/webRTCTypes'
import Toggler from '../../../../containers/meeting/components/Toggler'
import { useMeeting } from '../../../../containers/meeting/MeetingContext'

export default function ListOnlineParticipants() {
	const { localParticipant, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	if (!meetingRoom || !localParticipant)
		throw new Error('MeetingChatTab is not available')
	const participants = meetingRoom.remoteParticipants

	return (
		<Toggler
			renderToggle={({ open, setOpen }) => (
				<ListItemButton onClick={() => setOpen(!open)}>
					<GroupRoundedIcon />
					<ListItemContent>
						<Typography level="title-sm">Online Participant</Typography>
					</ListItemContent>
					<KeyboardArrowDownIcon
						sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
					/>
				</ListItemButton>
			)}
		>
			<List sx={{ gap: 0.5 }}>
				<ListItem sx={{ px: 0 }}>
					<ListItemDecorator>
						<Avatar
							size="md"
							variant="outlined"
							src={''}
							alt={localParticipant?.name}
						/>
					</ListItemDecorator>
					<ListItemContent sx={{ px: 1 }}>
						<Typography level="inherit" noWrap>
							(You) {localParticipant?.name}
						</Typography>
					</ListItemContent>
				</ListItem>
				{participants &&
					Array.from(participants.entries()).map(([pid, p], i) => (
						<ListItem key={i} sx={{ px: 0 }}>
							<ListItemDecorator>
								<Avatar
									variant="outlined"
									src={''}
									alt={localParticipant?.name}
								/>
							</ListItemDecorator>
							<ListItemContent sx={{ px: 1 }}>
								<Typography level="inherit" noWrap>
									{p.name}
								</Typography>
							</ListItemContent>
						</ListItem>
					))}
			</List>
		</Toggler>
	)
}
