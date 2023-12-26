import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import { Clear } from '@mui/icons-material'
import {
	FormControl,
	FormLabel,
	IconButton,
	Switch,
	Textarea,
	Typography,
} from '@mui/joy'
import { generateName } from 'utils/personalNameUtils'
import { Stack } from '@mui/material'
import { formatDatetime } from 'utils/datetimeUtils'
import { useAppDispatch } from 'contexts/hooks'
import { meetingFetchCreateInstant } from 'contexts/meeting'
import {
	MeetingType,
	ResponseMeetingDto,
} from 'api/http-rest/meeting/meetingApiType'
import { ApiResponse } from 'api/http-rest/apiResponses'
import RouterPath from 'views/routes/routesContants'
import useToastily from 'hooks/useToastily'

type CreateMeetingModalProps = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export function CreateMeetingModal({ open, setOpen }: CreateMeetingModalProps) {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToastily()

	const [fetching, setFetching] = useState(false)

	const [title, setTitle] = useState(generateName())
	const [description, setDescription] = useState('')
	const [startDatetime, setStartDatetime] = useState<Date>(new Date())
	const [endDateTime, setEndDateTime] = useState<Date>()
	const [isLook, setIsLook] = useState(true)

	const fetchCreateMeeting = () => {
		if (fetching) return
		setFetching(true)
		dispatch(
			meetingFetchCreateInstant({
				title,
				description,
				startDate: startDatetime.toString(),
				endDate: endDateTime?.toString(),
				type: isLook ? MeetingType.PRIVATE : MeetingType.PUBLIC,
			})
		)
			.then((result) => {
				if (result.meta.requestStatus === 'fulfilled') {
					const data = result.payload as ApiResponse<ResponseMeetingDto>

					navigate(RouterPath.getPreMeetingPath(data.data.id))
				} else toast({ content: 'Create Meeting Error', type: 'error' })
			})
			.finally(() => {
				setFetching(false)
				setOpen(false)
			})
	}

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
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<FormControl>
					<FormLabel sx={{ fontWeight: 'bold' }}>Description</FormLabel>
					<Textarea
						disabled={fetching}
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
						disabled={fetching}
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
						disabled={fetching}
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
								disabled={fetching}
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
					<Button
						variant="solid"
						color="success"
						loading={fetching}
						onClick={() => fetchCreateMeeting()}
					>
						Create
					</Button>
					<Button
						onClick={() => setOpen(false)}
						disabled={fetching}
						variant="outlined"
						color="neutral"
					>
						Cancel
					</Button>
				</Stack>
			</ModalDialog>
		</Modal>
	)
}
