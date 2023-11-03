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
import MeetingApi, {
	ResponseSuccessDataCreateMeeting,
} from 'api/http-rest/meetingApi'

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
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [friendLyId, setFriendlyId] = useState('')

	const validationLogin = useCallback(() => {
		return isLogin
	}, [isLogin])

	const createMeeting = useCallback(async () => {
		if (validationLogin()) {
			const res =
				await MeetingApi.createMeeting<ResponseSuccessDataCreateMeeting>()

			if (res.metadata.status === 200) {
				const data = res.data
				navigate(RouterPath.getPreMeetingPath(data.friendlyId))
			}
		}
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validationLogin()) navigate(RouterPath.getPreMeetingPath(friendLyId))
	}

	return (
		<MainContent>
			<TopWrapper>
				<Container maxWidth="md">
					<Box textAlign="center">
						<img
							style={{ display: 'inline-block' }}
							alt="Oline Meeting Images"
							width="400px"
							src={online_meeting_illustration}
						/>
						<Typography variant="h3" sx={{ my: 2 }}>
							Cuộc họp video chất lượng. Giờ đây miễn phí cho tất cả mọi người.
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							fontWeight="normal"
							sx={{ mb: 4 }}
						>
							Chúng tôi đã thiết kế lại Google Meet - dịch vụ tổ chức cuộc họp
							kinh doanh với độ bảo mật cao - để cung cấp miễn phí cho mọi
							người.
						</Typography>
					</Box>
					<Container maxWidth="sm">
						<Box sx={{ textAlign: 'center', mt: 3, p: 4 }}>
							<form onSubmit={handleSubmit}>
								<FormControl
									variant="outlined"
									fullWidth
									onSubmit={(e) => {
										e.preventDefault()
										console.log('Submit')
									}}
								>
									<OutlinedInput
										value={friendLyId}
										onChange={(e) => setFriendlyId(e.target.value)}
										type="text"
										required={true}
										placeholder="Input meeting id..."
										endAdornment={
											<InputAdornment position="end">
												<Button variant="contained" type="submit">
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
							<Divider sx={{ my: 4 }}>OR</Divider>
							<Button variant="outlined" onClick={createMeeting}>
								Create Meeting
							</Button>
						</Box>
					</Container>
				</Container>
			</TopWrapper>
		</MainContent>
	)
}
