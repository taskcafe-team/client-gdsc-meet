import React, { useCallback, useState, useLayoutEffect } from 'react'
import { generateName } from 'utils/personalNameUtils'
import { useAppDispatch } from 'contexts/hooks'
import { meetingFetchCreateInstant } from 'contexts/meeting'
import {
	Box,
	Button,
	Input,
	Typography,
	FormLabel,
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
import { ApiResponse } from 'api/http-rest/common/apiResponses'
import {
	MeetingType,
	ResponseMeetingDto,
} from 'api/http-rest/meeting/meetingApiType'
import { DEFAUFT } from './HomePage'

type CreateMeetingFormProps = {
	opinion?: string
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateMeetingFormDialog({
	opinion = DEFAUFT,
	open,
	setOpen,
}: CreateMeetingFormProps) {
	const dispatch = useAppDispatch()
	const [fetching, setFetching] = useState(false)
	const [meetingTitle, setMeetingTitle] = useState('')
	const [meetingDescription, setMeetingDescription] = useState('')
	const [isLook, setIsLook] = useState(true)
	const navigate = useNavigate()
	const toast = useToastily()

	const handleSubmitCreateMeeting = useCallback(async () => {
		setFetching(true)
		try {
			const res = await dispatch(
				meetingFetchCreateInstant({
					title: meetingTitle || undefined,
					description: meetingDescription || undefined,
					type: isLook ? MeetingType.PRIVATE : MeetingType.PUBLIC,
				})
			)

			const payload = res.payload as ApiResponse<ResponseMeetingDto>

			if (payload.metadata.success) {
				navigate(RouterPath.getPreMeetingPath(payload.data.id))
			} else {
				throw new Error(payload.metadata.message)
			}
		} catch (err: any) {
			toast({ content: err.message || 'Something wrong!', type: 'error' })
		} finally {
			setFetching(false)
		}
	}, [meetingTitle, meetingDescription, isLook])

	const handleTitle = useCallback(() => {
		const initTitle: string =
			opinion === DEFAUFT ? generateName() : opinion || ''
		setMeetingTitle(initTitle)
	}, [opinion])

	useLayoutEffect(() => {
		handleTitle()
	}, [opinion])

	return (
		<Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
			<DialogTitle fontWeight="bold">Create Meeting</DialogTitle>
			<DialogContent>
				<Box pb={1}>
					<FormControl>
						<label className="text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
							Title
						</label>
						<Input
							disabled={fetching}
							placeholder="No Title"
							value={meetingTitle}
							onChange={(e) => setMeetingTitle(e.target.value)}
							className="border-primary"
						/>
					</FormControl>
				</Box>
				<Box pb={1}>
					<FormControl>
						<label className="text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
							Description
						</label>
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
					onClick={() => setOpen(false)}
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
