import Input from '@mui/joy/Input'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { MeetingInfo } from 'contexts/meeting'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import IconButton from '@mui/joy/IconButton'
import { FormControl, FormLabel, Textarea } from '@mui/joy'
import moment from 'moment'
import { formatDatetime } from 'utils/datetimeUtils'
import RouterPath from 'views/routes/routesContants'

export interface MeetingInfoModalProps {
	meetingInfo: MeetingInfo
	setMeetingInfo: React.Dispatch<React.SetStateAction<MeetingInfo | null>>
}

export default function MeetingInfoModal({
	meetingInfo,
	setMeetingInfo,
}: MeetingInfoModalProps) {
	const navigate = useNavigate()
	const [meeting, setMeeting] = useState(meetingInfo)
	const [canedit, setCanedit] = useState(false)

	const joinMeeting = useCallback(() => {
		setMeetingInfo(null)
		navigate(RouterPath.getPreMeetingPath(meeting.id))
	}, [])

	useEffect(() => {}, [meetingInfo])

	return (
		<Modal open={Boolean(meeting)} onClose={() => setMeetingInfo(null)}>
			<ModalDialog
				aria-labelledby="nested-modal-title"
				aria-describedby="nested-modal-description"
			>
				<Typography id="nested-modal-title" level="h2">
					<Input
						sx={{
							p: 0,
							fontSize: 'inherit',
							'--Input-focusedInset': 'none',
						}}
						variant="plain"
						placeholder="No Title"
						value={meeting.title || ''}
						onChange={(e) =>
							canedit && setMeeting({ ...meeting, title: e.target.value })
						}
						endDecorator={
							<IconButton onClick={() => setCanedit(!canedit)}>
								{canedit ? <EditOffIcon /> : <EditIcon />}
							</IconButton>
						}
					/>
				</Typography>
				<Typography fontSize={10}>Code: {meeting.id}</Typography>
				<Typography id="nested-modal-description" textColor="text.tertiary">
					<FormControl>
						<FormLabel sx={{ fontWeight: 'bold' }}>Description</FormLabel>
						<Textarea
							disabled={!canedit}
							minRows={1}
							maxRows={10}
							placeholder="No Description"
							value={meeting.description || ''}
							onChange={(e) =>
								setMeeting({ ...meeting, description: e.target.value })
							}
						/>
					</FormControl>
				</Typography>

				<Typography id="nested-modal-description" textColor="text.tertiary">
					<FormControl>
						<FormLabel sx={{ fontWeight: 'bold' }}>Start Time</FormLabel>
						<Input
							disabled={!canedit}
							type="datetime-local"
							onChange={(e) =>
								setMeeting({
									...meeting,
									startTime: moment(e.target.value).toDate().toISOString(),
								})
							}
							value={formatDatetime(meeting.startTime) || ''}
							slotProps={{
								input: {
									min: formatDatetime(meeting.startTime) || '',
								},
							}}
						/>
					</FormControl>
				</Typography>

				<Typography id="nested-modal-description" textColor="text.tertiary">
					<FormControl>
						<FormLabel sx={{ fontWeight: 'bold' }}>End Time</FormLabel>
						<Input
							disabled={!canedit}
							type="datetime-local"
							value={(meeting.endTime && formatDatetime(meeting.endTime)) || ''}
							onChange={(e) =>
								setMeeting({
									...meeting,
									endTime: moment(e.target.value).toDate().toISOString(),
								})
							}
							slotProps={{
								input: {
									min:
										(meeting.endTime && formatDatetime(meeting.endTime)) || '',
								},
							}}
						/>
					</FormControl>
				</Typography>
				<Box
					sx={{
						mt: 1,
						display: 'flex',
						gap: 1,
						flexDirection: { xs: 'column', sm: 'row-reverse' },
					}}
				>
					<Button variant="solid" color="success" onClick={joinMeeting}>
						Join Meeting
					</Button>
					<Button variant="solid" color="warning" disabled>
						Save
					</Button>
					<Button
						variant="outlined"
						color="neutral"
						onClick={() => setMeetingInfo(null)}
					>
						Cancel
					</Button>
				</Box>
			</ModalDialog>
		</Modal>
	)
}
