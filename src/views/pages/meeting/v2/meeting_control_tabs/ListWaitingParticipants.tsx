import Avatar from '@mui/joy/Avatar'
import Button from '@mui/joy/Button'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Badge, Checkbox, ListItemDecorator } from '@mui/joy'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { useMeeting } from '../../../../containers/meeting/MeetingContext'
import Toggler from '../../../../containers/meeting/components/Toggler'
import { AccessPermissionsStatus } from 'api/http-rest/participant/participantDtos'
import ParticipantApi from 'api/http-rest/participant/participantApi'

export default function ListWaitingParticipants() {
	const { roomList, meetingId } = useMeeting()
	const waitingRoom = roomList.get(RoomType.WAITING)
	if (!waitingRoom) throw new Error('ListOnlineParticipants is not available')
	const participants = waitingRoom.remoteParticipants

	const waitingParticipantsCount = participants.size
	const [selected, setSelected] = useState<Map<string, boolean>>(new Map())
	const [fetching, setFetching] = useState(false)

	const handleRespondRequest = (status: AccessPermissionsStatus) => {
		return async () => {
			if (fetching || selected.size === 0) return
			setFetching(true)
			const partIds = Array.from(selected.keys())
			const req = { partIds, status }
			await ParticipantApi.respondRequestJoinMeeting(meetingId, req)
				.catch(() => console.log('Respond Fail'))
				.finally(() => setFetching(false))
		}
	}

	const handleCheckBoxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Toggle checkbox all
		setSelected(() => {
			const checked = event.target.checked
			const s = new Map<string, boolean>()
			if (!checked) return s
			else participants.forEach((_) => s.set(_.id, checked))
			return s
		})
	}

	const handleCheckBoxItem = (id: string) => {
		// Toggle checkbox
		return () =>
			setSelected((prev) => {
				const s = new Map(prev)
				if (s.get(id) ?? false) s.delete(id)
				else s.set(id, true)
				return s
			})
	}

	return (
		<Toggler
			renderToggle={({ open, setOpen }) => (
				<ListItemButton onClick={() => setOpen(!open)}>
					<Badge
						badgeContent={waitingParticipantsCount}
						variant="soft"
						color="warning"
					>
						<GroupRoundedIcon />
					</Badge>
					<ListItemContent>
						<Typography level="title-sm">Waiting Participant</Typography>
					</ListItemContent>
					<KeyboardArrowDownIcon
						sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
					/>
				</ListItemButton>
			)}
		>
			<List sx={{ gap: 0.5 }}>
				<ListItem sx={{ mt: 0.5, px: 1 }}>
					<Checkbox
						disabled={fetching}
						onChange={handleCheckBoxAll}
						variant="soft"
					/>
					<Button
						onClick={handleRespondRequest('accept')}
						loading={fetching}
						variant="outlined"
						size="sm"
						color="success"
					>
						Accepts
					</Button>
					<Button
						onClick={handleRespondRequest('reject')}
						loading={fetching}
						variant="outlined"
						size="sm"
						color="warning"
					>
						Rejects
					</Button>
				</ListItem>

				{participants &&
					Array.from(participants.entries()).map(([id, p], i) => (
						<ListItem key={i} sx={{ px: 1 }}>
							<Checkbox
								disabled={fetching}
								variant="soft"
								checked={selected.get(id) ?? false}
								onChange={handleCheckBoxItem(id)}
							/>
							<ListItemDecorator>
								{/* {//TODO: Chua add src} */}
								<Avatar variant="outlined" src={''} alt={p.name} />
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
