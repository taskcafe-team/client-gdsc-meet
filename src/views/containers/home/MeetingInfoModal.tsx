import Input from '@mui/joy/Input'
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
import ParticipantApi from 'api/http-rest/participant/participantApi'

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
	const [title, setTitle] = useState(meetingInfo.title)
	const [description, setDescription] = useState(meetingInfo.description)
	const [startDatetime, setStartDatetime] = useState<Date>(
		new Date(meetingInfo.startTime)
	)
	const [endDateTime, setEndDateTime] = useState<Date | null>(
		meetingInfo.endTime ? new Date(meetingInfo.endTime) : null
	)
	const [isLook, setIsLook] = useState(
		meetingInfo.type === 'PRIVATE' ? true : false
	)

	const fetchUpdateMeeting = useCallback(async () => {
		if (fetching) return

		const type = isLook ? MeetingType.PRIVATE : MeetingType.PUBLIC
		const request: RequestUpdateMeetingBody = { meetingId }
		if (title !== meetingInfo.title) request.title = title
		if (description !== meetingInfo.description)
			request.description = description
		if (startDatetime.getTime() !== new Date(meetingInfo.startTime).getTime())
			request.startDate = startDatetime.toString()
		if (
			(!endDateTime && meetingInfo.endTime) ||
			(endDateTime && !meetingInfo.endTime) ||
			(endDateTime &&
				meetingInfo.endTime &&
				endDateTime.getTime() !== new Date(meetingInfo.endTime).getTime())
		)
			request.endDate = endDateTime?.toString()
		if (type !== meetingInfo.type) request.type = type

		dispatch(meetingFetchUpdateInstant(request))
			.then((res) => {
				if (res.meta.requestStatus === 'fulfilled')
					toast({ content: 'Update meeting success', type: 'success' })
				else toast({ content: 'Update meeting failed', type: 'error' })
			})
			.finally(() => setFetching(false))
	}, [fetching, title, description, startDatetime, endDateTime, isLook])

	const joinMeeting = useCallback(() => {
		setOpen(false)
		navigate(RouterPath.getPreMeetingPath(meetingId))
	}, [])

	// Handle can save
	useLayoutEffect(() => {
		const type = isLook ? MeetingType.PRIVATE : MeetingType.PUBLIC
		if (title !== meetingInfo.title) setCanSave(true)
		else if (description !== meetingInfo.description) setCanSave(true)
		else if (
			startDatetime.getTime() !== new Date(meetingInfo.startTime).getTime()
		)
			setCanSave(true)
		else if (
			(!endDateTime && meetingInfo.endTime) ||
			(endDateTime && !meetingInfo.endTime) ||
			(endDateTime &&
				meetingInfo.endTime &&
				endDateTime.getTime() !== new Date(meetingInfo.endTime).getTime())
		)
			setCanSave(true)
		else if (type !== meetingInfo.type) setCanSave(true)
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
					value={title ?? ''}
					onChange={(e) => canedit && setTitle(e.target.value)}
				/>
				<Typography fontSize={10}>Code: {meetingId}</Typography>
				<FormControl>
					<FormLabel sx={{ fontWeight: 'bold' }}>Description</FormLabel>
					<Textarea
						disabled={fetching || !canedit}
						value={description ?? ''}
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
							if (endDateTime) if (time > endDateTime) setEndDateTime(null)
							setStartDatetime(time)
						}}
					/>
				</FormControl>

				<FormControl>
					<FormLabel sx={{ fontWeight: 'bold' }}>End Time</FormLabel>
					<Input
						disabled={fetching || !canedit}
						startDecorator={
							<IconButton onClick={() => setEndDateTime(null)}>
								<Clear />
							</IconButton>
						}
						type="datetime-local"
						slotProps={{
							input: { min: formatDatetime(new Date(startDatetime)) },
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
					<Button
						variant="solid"
						color="warning"
						disabled={!canSave}
						loading={fetching}
						onClick={() => fetchUpdateMeeting()}
					>
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
