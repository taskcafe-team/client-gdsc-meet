import Input from '@mui/joy/Input'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import { MeetingInfo, meetingFetchUpdateInstant } from 'contexts/meeting'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import IconButton from '@mui/joy/IconButton'
import { FormControl, FormLabel, Stack, Switch, Textarea } from '@mui/joy'
import moment from 'moment'
import { formatDatetime } from 'utils/datetimeUtils'
import RouterPath from 'views/routes/routesContants'
import { Clear } from '@mui/icons-material'
import { useAppDispatch } from 'contexts/hooks'
import useToastily from 'hooks/useToastily'
import {
	MeetingType,
	RequestUpdateMeetingBody,
} from 'api/http-rest/meeting/meetingApiType'

type MeetingInfoModalProps = {
	meetingInfo: MeetingInfo
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MeetingInfoModal({
	meetingInfo,
	open,
	setOpen,
}: MeetingInfoModalProps) {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToastily()

	const [fetching, setFetching] = useState(false)
	const [canedit, setCanedit] = useState(false)
	const [canSave, setCanSave] = useState(false)

	const meetingId = meetingInfo.id
	const [title, setTitle] = useState(meetingInfo.title ?? '')
	const [description, setDescription] = useState(meetingInfo.description ?? '')
	const [startDatetime, setStartDatetime] = useState<Date>(
		new Date(meetingInfo.startTime)
	)
	const [endDateTime, setEndDateTime] = useState<Date | undefined>(
		meetingInfo.endTime ? new Date(meetingInfo.endTime) : undefined
	)
	const [isLook, setIsLook] = useState(
		meetingInfo.type === 'PRIVATE' ? true : false
	)

	const fetchUpdateMeeting = useCallback(() => {
		setFetching(true)
		const type = isLook ? MeetingType.PRIVATE : MeetingType.PUBLIC
		const req: RequestUpdateMeetingBody = {
			meetingId,
			title,
			description,
			startDate: startDatetime.toString(),
			endDate: endDateTime?.toString() ?? undefined,
			type,
		}
		dispatch(meetingFetchUpdateInstant(req))
			.then((res) => {
				if (res.meta.requestStatus === 'fulfilled')
					toast({ content: 'Update meeting success', type: 'success' })
				else toast({ content: 'Update meeting failed', type: 'error' })
			})
			.finally(() => setFetching(false))

		//TODO: Write fetchUpdateMeeting
	}, [title, description, startDatetime, endDateTime, isLook])

	const joinMeeting = useCallback(() => {
		setOpen(false)
		navigate(RouterPath.getPreMeetingPath(meetingId))
	}, [])

	// Handle can save
	useLayoutEffect(() => {
		if (title !== meetingInfo.title) setCanSave(true)
		else if (description !== meetingInfo.description) setCanSave(true)
		else if (startDatetime !== new Date(meetingInfo.startTime)) setCanSave(true)
		else if (
			meetingInfo.endTime &&
			endDateTime !== new Date(meetingInfo.endTime)
		)
			setCanSave(true)
		else if (isLook !== (meetingInfo.type === 'PRIVATE' ? true : false))
			setCanSave(true)
		else setCanSave(false)
	}, [title, description, startDatetime, endDateTime, isLook])

	return (
		<Modal open={open}>
			<ModalDialog sx={{ width: 360 }}>
				<Input
					disabled={fetching}
					autoFocus
					sx={{
						p: 0,
						fontWeight: 'bold',
						fontSize: '1.3rem',
						'--Input-focusedInset': 'none',
					}}
					variant="plain"
					placeholder="No Title"
					endDecorator={
						<IconButton onClick={() => setCanedit(!canedit)}>
							{canedit ? <EditOffIcon /> : <EditIcon />}
						</IconButton>
					}
					value={title}
					onChange={(e) => canedit && setTitle(e.target.value)}
				/>
				<Typography fontSize={10}>Code: {meetingId}</Typography>
				<FormControl>
					<FormLabel sx={{ fontWeight: 'bold' }}>Description</FormLabel>
					<Textarea
						disabled={fetching || !canedit}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						minRows={1}
						maxRows={10}
						placeholder="No Description"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Start Time</FormLabel>
					<Input
						disabled={fetching || !canedit}
						type="datetime-local"
						slotProps={{
							input: { min: formatDatetime(new Date()) },
						}}
						sx={{ fontWeight: 'bold' }}
						value={formatDatetime(startDatetime)}
						onChange={(e) => {
							const time = new Date(e.target.value)
							if (endDateTime) if (time > endDateTime) setEndDateTime(undefined)
							setStartDatetime(time)
						}}
					/>
				</FormControl>

				<FormControl>
					<FormLabel sx={{ fontWeight: 'bold' }}>End Time</FormLabel>
					<Input
						disabled={fetching || !canedit}
						startDecorator={
							<IconButton onClick={() => setEndDateTime(undefined)}>
								<Clear />
							</IconButton>
						}
						type="datetime-local"
						slotProps={{
							input: {
								min: formatDatetime(new Date(startDatetime)),
							},
						}}
						sx={{ fontWeight: 'bold' }}
						value={endDateTime ? formatDatetime(endDateTime) : ''}
						onChange={(e) => setEndDateTime(new Date(e.target.value))}
					/>
				</FormControl>
				<FormControl>
					<Typography
						component="label"
						startDecorator={
							<Switch
								disabled={fetching || !canedit}
								checked={isLook}
								onChange={(e) => setIsLook(e.target.checked)}
								sx={{ mr: 1 }}
							/>
						}
					>
						Look Meeting
					</Typography>
				</FormControl>
				<Stack direction="row-reverse" sx={{ mt: 1, gap: 1 }}>
					<Button variant="solid" color="success" onClick={() => joinMeeting()}>
						Join Meeting
					</Button>
					<Button variant="solid" color="warning" disabled={canSave}>
						Save
					</Button>
					<Button
						variant="outlined"
						color="neutral"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
				</Stack>
			</ModalDialog>
		</Modal>
	)
}

// export default function MeetingInfoModal({
// 	meetingInfo,
// 	setMeetingInfo,
// }: MeetingInfoModalProps) {
// 	const navigate = useNavigate()
// 	const [meeting, setMeeting] = useState(meetingInfo)
// 	const [canedit, setCanedit] = useState(false)

// 	const joinMeeting = useCallback(() => {
// 		setMeetingInfo(null)
// 		navigate(RouterPath.getPreMeetingPath(meeting.id))
// 	}, [])

// 	useEffect(() => {}, [meetingInfo])

// 	return (
// 		<Modal open={Boolean(meeting)} onClose={() => setMeetingInfo(null)}>
// 			<ModalDialog>
// 				<Input
// 					sx={{
// 						p: 0,
// 						fontSize: 'inherit',
// 						'--Input-focusedInset': 'none',
// 					}}
// 					variant="plain"
// 					placeholder="No Title"
// 					value={meeting.title || ''}
// 					onChange={(e) =>
// 						canedit && setMeeting({ ...meeting, title: e.target.value })
// 					}
// 					endDecorator={
// 						<IconButton onClick={() => setCanedit(!canedit)}>
// 							{canedit ? <EditOffIcon /> : <EditIcon />}
// 						</IconButton>
// 					}
// 				/>
// 				<Typography fontSize={10}>Code: {meeting.id}</Typography>
// 				<FormControl>
// 					<FormLabel sx={{ fontWeight: 'bold' }}>Description</FormLabel>
// 					<Textarea
// 						disabled={!canedit}
// 						minRows={1}
// 						maxRows={10}
// 						placeholder="No Description"
// 						value={meeting.description || ''}
// 						onChange={(e) =>
// 							setMeeting({ ...meeting, description: e.target.value })
// 						}
// 					/>
// 				</FormControl>

// 				<FormControl>
// 					<FormLabel sx={{ fontWeight: 'bold' }}>Start Time</FormLabel>
// 					<Input
// 						disabled={!canedit}
// 						type="datetime-local"
// 						onChange={(e) =>
// 							setMeeting({
// 								...meeting,
// 								startTime: moment(e.target.value).toDate().toISOString(),
// 							})
// 						}
// 						value={formatDatetime(new Date(meeting.startTime)) || ''}
// 						slotProps={{
// 							input: { min: formatDatetime(new Date(meeting.startTime)) || '' },
// 						}}
// 					/>
// 				</FormControl>

// 				<FormControl>
// 					<FormLabel sx={{ fontWeight: 'bold' }}>End Time</FormLabel>
// 					<Input
// 						disabled={!canedit}
// 						type="datetime-local"
// 						value={(meeting.endTime && formatDatetime(meeting.endTime)) || ''}
// 						onChange={(e) =>
// 							setMeeting({
// 								...meeting,
// 								endTime: moment(e.target.value).toDate().toISOString(),
// 							})
// 						}
// 						slotProps={{
// 							input: {
// 								min: (meeting.endTime && formatDatetime(meeting.endTime)) || '',
// 							},
// 						}}
// 					/>
// 				</FormControl>
// 				<Box
// 					sx={{
// 						mt: 1,
// 						display: 'flex',
// 						gap: 1,
// 						flexDirection: { xs: 'column', sm: 'row-reverse' },
// 					}}
// 				>
// 					<Button variant="solid" color="success" onClick={joinMeeting}>
// 						Join Meeting
// 					</Button>
// 					<Button variant="solid" color="warning" disabled>
// 						Save
// 					</Button>
// 					<Button
// 						variant="outlined"
// 						color="neutral"
// 						onClick={() => setMeetingInfo(null)}
// 					>
// 						Cancel
// 					</Button>
// 				</Box>
// 			</ModalDialog>
// 		</Modal>
// 	)
// }
