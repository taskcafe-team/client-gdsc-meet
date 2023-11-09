import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	FormGroup,
	FormControlLabel,
	Switch,
} from '@mui/material'
import React from 'react'
import { StyledInput, Label, TextareaAutosize } from './Component'
import { generateName } from 'utils/personalNameUtils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { meetingFetchCreateInstantAndJoin } from 'contexts/meeting'
import { MeetingStatus } from 'api/http-rest/meetingApi'
import { Typography } from '@mui/joy'

type CreateMeetingFormProps = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateMeetingFormDialog(props: CreateMeetingFormProps) {
	const dispatch = useAppDispatch()
	const meetingFetching = useAppSelector((s) => s.meeting.loading)
	const navigate = useNavigate()

	const [meetingTitle, setMeetingTitle] = useState(generateName())
	const [meetingDescription, setMeetingDescription] = useState('')
	const [isLook, setIsLook] = useState(true)
	// const [meetingStartDate, setMeetingStartDate] = useState<Date>(new Date())
	// const [meetingEndDate, setMeetingEndDate] = useState<Date>()

	const handleClose = () => {
		props.setOpen(false)
	}

	const handleSubmitCreateMeeting = useCallback(async () => {
		const request = {
			title: meetingTitle || undefined,
			description: meetingDescription || undefined,
			stauts: isLook ? MeetingStatus.PRIVATE : MeetingStatus.PUBLIC,
			navigate,
		}
		dispatch(meetingFetchCreateInstantAndJoin(request))
		props.setOpen(false)
	}, [meetingTitle, meetingDescription, isLook])

	return (
		<Dialog
			fullWidth
			maxWidth="xs"
			open={props.open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				<Typography component="h4" level="h4">
					Create Meeting
				</Typography>
			</DialogTitle>
			<DialogContent>
				<FormGroup>
					<Box pb={1}>
						<Label>Title</Label>
						<StyledInput
							placeholder="Input meeting title"
							value={meetingTitle}
							onChange={(e) => setMeetingTitle(e.target.value)}
						/>
					</Box>
					<Box pb={1}>
						<Label>Description</Label>
						<TextareaAutosize
							value={meetingDescription}
							onChange={(e) => setMeetingDescription(e.target.value)}
							aria-label="empty textarea"
							placeholder="Empty"
						/>
					</Box>
					<Box>
						<FormControlLabel
							value={isLook}
							onChange={(e) =>
								setIsLook((e.target as HTMLInputElement).checked)
							}
							control={<Switch defaultChecked />}
							label="Look Meeting"
						/>
					</Box>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button disabled={meetingFetching} size="small" onClick={handleClose}>
					Cancel
				</Button>
				<LoadingButton
					loading={meetingFetching}
					type="submit"
					size="small"
					variant="contained"
					onClick={handleSubmitCreateMeeting}
				>
					Create
				</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}
