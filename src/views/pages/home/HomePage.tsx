import React from 'react'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import useToastily from 'hooks/useToastily'
import { Box, Button, Input, Stack } from '@mui/joy'
import RouterPath from 'views/routes/routesContants'

import { CreateMeetingModal } from 'views/containers/home/CreateMeetingModal'

import ListMeeting from 'views/containers/home/ListMeeting'

export default function HomePage() {
	const [openCreateMeetingForm, setOpenCreateMeetingForm] = useState(false)
	const toast = useToastily()
	const navigate = useNavigate()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [meetingId, setMeetingId] = useState('')

	const validationLogin = useCallback(() => {
		if (!isLogin) toast({ content: 'Please login!', type: 'warning' })
		return isLogin
	}, [isLogin])

	const hanldeSubmitJoinMeeting = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			if (validationLogin() && meetingId.length > 0)
				navigate(RouterPath.getPreMeetingPath(meetingId))
		},
		[meetingId]
	)

	return (
		<Box sx={{ my: 2, mx: 2, mt: '5vh' }}>
			{openCreateMeetingForm && (
				<CreateMeetingModal
					open={openCreateMeetingForm}
					setOpen={setOpenCreateMeetingForm}
				/>
			)}
			<Box maxWidth="sm" margin="auto">
				<Box textAlign="center">
					<img
						style={{ display: 'inline-block', border: 'none' }}
						alt="Oline Meeting Images"
						width="300px"
						src={online_meeting_illustration}
					/>
					<h2 className="text-32">
						<span className="text-primary font-bold">Quality</span> video
						meetings. Now <span className="text-primary font-bold">free</span>{' '}
						for everyone.
					</h2>
					<p className="p-2">
						GDSC Meet - business meeting organization service with high
						security.
					</p>
				</Box>
				<Box maxWidth="sm">
					<Box sx={{ textAlign: 'center', mt: 3 }}>
						<form onSubmit={hanldeSubmitJoinMeeting}>
							<Stack
								direction={{ xs: 'column', md: 'row' }}
								justifyContent="space-between"
								spacing={1}
							>
								<Input
									value={meetingId}
									onChange={(e) => setMeetingId(e.target.value.trim())}
									required
									fullWidth
									placeholder="Input meeting code!"
									startDecorator={<CallIcon />}
									endDecorator={<Button type="submit">Join</Button>}
								/>
								<Box display="flex" alignItems="center">
									<Button
										fullWidth
										size="sm"
										type="button"
										variant="outlined"
										onClick={() =>
											validationLogin() && setOpenCreateMeetingForm(true)
										}
									>
										Create
									</Button>
								</Box>
							</Stack>
						</form>
					</Box>
				</Box>
				<Box maxWidth="sm">
					<ListMeeting />
				</Box>
			</Box>
		</Box>
	)
}
