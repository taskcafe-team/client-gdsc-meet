import React from 'react'
import { generateName } from 'utils/personalNameUtils'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { meetingFetchCreateInstant } from 'contexts/meeting'
import { MeetingStatus, ResponseMeetingDto } from 'api/http-rest/meetingApi'
import {
	Box,
	Button,
	Input,
	Typography,
	FormLabel,
	FormHelperText,
	Textarea,
	FormControl,
	Switch,
} from '@mui/joy'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material'
import RouterPath from 'views/routes/routesContants'
import useToastily from 'hooks/useToastily'
import { ApiResponse } from 'api/apiResponses'

type CreateMeetingFormProps = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateMeetingFormDialog(props: CreateMeetingFormProps) {
	const dispatch = useAppDispatch()
	const [fetching, setFetching] = useState(false)
	const navigate = useNavigate()
	const toast = useToastily()

	const [meetingTitle, setMeetingTitle] = useState(generateName())
	const [meetingDescription, setMeetingDescription] = useState('')
	const [isLook, setIsLook] = useState(true)
	// const [meetingStartDate, setMeetingStartDate] = useState<Date>(new Date())
	// const [meetingEndDate, setMeetingEndDate] = useState<Date>()

	const handleSubmitCreateMeeting = useCallback(async () => {
		setFetching(true)
		dispatch(
			meetingFetchCreateInstant({
				title: meetingTitle || undefined,
				description: meetingDescription || undefined,
				status: isLook ? MeetingStatus.PRIVATE : MeetingStatus.PUBLIC,
			})
		)
			.then((res) => {
				const payload = res.payload as ApiResponse<ResponseMeetingDto>
				if (payload.metadata.success)
					navigate(RouterPath.getPreMeetingPath(payload.data.id))
				else throw new Error(payload.metadata.message)
			})
			.catch((err) =>
				toast({ content: err.message || 'Something wrong!', type: 'error' })
			)
			.finally(() => setFetching(false))
	}, [meetingTitle, meetingDescription, isLook])

	return (
		<Dialog
			fullWidth
			maxWidth="xs"
			open={props.open}
			onClose={() => props.setOpen(false)}
		>
			<DialogTitle fontWeight="bold">Create Meeting</DialogTitle>
			<DialogContent>
				<Box pb={1}>
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input
							disabled={fetching}
							placeholder="No Title"
							value={meetingTitle}
							onChange={(e) => setMeetingTitle(e.target.value)}
						/>
					</FormControl>
				</Box>
				<Box pb={1}>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Textarea
							disabled={fetching}
							minRows={2}
							maxRows={10}
							placeholder="No Description"
							value={meetingDescription}
							onChange={(e) => setMeetingDescription(e.target.value)}
						/>
					</FormControl>
				</Box>
				<Box>
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
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					disabled={fetching}
					variant="outlined"
					onClick={() => props.setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					loading={fetching}
					type="submit"
					variant="solid"
					onClick={handleSubmitCreateMeeting}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	)
}
