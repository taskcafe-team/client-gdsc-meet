import React from 'react'
import {
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Typography,
	styled,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import RouterPath from 'views/routes/routesContants'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import {
	meetingFetchCreateInstant,
	meetingFetchCreateInstantAndJoin,
} from 'contexts/meeting'
import useToastily from 'hooks/useToastily'

const MainContent = styled(Box)(
	() => `
    width: 100%;
    display: flex;s
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
	() => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
  `
)

export default function HomePage() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToastily()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetingErr = useAppSelector((s) => s.meeting.error)
	const [friendLyId, setFriendlyId] = useState('')

	const validationLogin = useCallback(() => {
		return isLogin
	}, [isLogin])

	useEffect(() => {
		if (meetingErr) toast({ content: meetingErr.message, type: 'error' })
	}, [meetingErr])

	const createMeeting = useCallback(async () => {
		dispatch(meetingFetchCreateInstantAndJoin({ navigate }))
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validationLogin()) navigate(RouterPath.getPreMeetingPath(friendLyId))
	}

	return (
		<MainContent>
			<TopWrapper>
				<Container maxWidth="sm">
					<Box textAlign="center">
						<img
							style={{ display: 'inline-block' }}
							alt="Oline Meeting Images"
							width="300px"
							src={online_meeting_illustration}
						/>
						<Typography variant="h4" sx={{ my: 2 }}>
							Cuộc họp video chất lượng. Giờ đây miễn phí cho tất cả mọi người.
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							fontWeight="normal"
							sx={{ mb: 4 }}
						>
							GDSC Meet - dịch vụ tổ chức cuộc họp kinh doanh với độ bảo mật
							cao.
						</Typography>
					</Box>
					<Container maxWidth="sm">
						<Box sx={{ textAlign: 'center', mt: 3, py: 2, px: { md: 4 } }}>
							<form onSubmit={handleSubmit}>
								<FormControl
									variant="outlined"
									fullWidth
									onSubmit={(e) => e.preventDefault()}
								>
									<OutlinedInput
										value={friendLyId}
										onChange={(e) => setFriendlyId(e.target.value)}
										type="text"
										required={true}
										placeholder="xxx-xxxx-xxx"
										endAdornment={
											<InputAdornment position="end">
												<Button size="small" variant="contained" type="submit">
													Join Meeting
												</Button>
											</InputAdornment>
										}
										startAdornment={
											<InputAdornment position="start">
												<CallIcon />
											</InputAdornment>
										}
									/>
								</FormControl>
							</form>
							<Divider sx={{ my: 2 }}>OR</Divider>
							<Button size="medium" variant="outlined" onClick={createMeeting}>
								Create Meeting
							</Button>
						</Box>
					</Container>
				</Container>
			</TopWrapper>
		</MainContent>
	)
}
