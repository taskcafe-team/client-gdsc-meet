import React from 'react'
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Card, Grid, IconButton } from '@mui/material'
import VideoPlayer from './VideoPlayer'

export default function PreJoin({ btnJoinMeetingClick }) {
	const [videoAllowed, setVideoAllowed] = useState(true)
	const [audioAllowed, setAudioAllowed] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const _btnJoinMeetingClick = useCallback(() => {
		btnJoinMeetingClick(isLoading, setIsLoading)
	}, [btnJoinMeetingClick, isLoading])

	return (
		<Card>
			<Box sx={{ p: 3 }} width="550px" height="400px">
				<Card sx={{ width: 1, height: 1, bgcolor: 'black' }}>
					<VideoPlayer videoAllowed={videoAllowed} flipX={true} width="100%" />
				</Card>
			</Box>
			<Box sx={{ p: 3, pt: 0 }}>
				<Grid container justifyContent="center" spacing={1}>
					<Grid item>
						<IconButton
							disabled={isLoading}
							onClick={() => setVideoAllowed(!videoAllowed)}
						>
							{videoAllowed ? <Videocam /> : <VideocamOff />}
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							disabled={isLoading}
							onClick={() => setAudioAllowed(!audioAllowed)}
						>
							{audioAllowed ? <Mic /> : <MicOff />}
						</IconButton>
					</Grid>
					<Grid item>
						<LoadingButton
							loading={isLoading}
							variant="outlined"
							onClick={_btnJoinMeetingClick}
						>
							Join Meeting
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		</Card>
	)
}
