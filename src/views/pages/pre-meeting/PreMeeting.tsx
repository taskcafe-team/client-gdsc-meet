import React, { useCallback } from 'react'
import { Box, Card, Grid, IconButton } from '@mui/material'
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

export function VideoPlayer({
	videoAllowed = false,
	// audioAllowed = false,
	flipX = false,
	flipY = false,
	...props
}) {
	const videoEl = useRef<HTMLVideoElement>(null)

	const getMedia = useCallback(() => {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: videoAllowed, audio: true })
				.then((stream) => {
					if (videoEl.current) videoEl.current.srcObject = stream
				})
				.catch((error) => console.log('Something went wrong!', error))
		}
	}, [videoAllowed])

	// Flipped video
	useLayoutEffect(() => {
		if (!videoEl.current) return
		let transform = ''
		if (flipX) transform += 'scaleX(-1)'
		if (flipY) transform += ' scaleY(-1)'

		if (transform.length > 0) videoEl.current.style.transform = transform
	}, [flipX, flipY])

	// Create stream tracks from camera or mic
	useLayoutEffect(() => {
		getMedia()
	}, [getMedia, videoAllowed])

	return (
		<video
			ref={videoEl}
			autoPlay={true}
			{...props}
			style={{ display: 'block', height: '100%', objectFit: 'cover' }}
		/>
	)
}

export default function PreMeeting({ ...other }) {
	const [videoAllowed, setVideoAllowed] = useState(true)
	const [audioAllowed, setAudioAllowed] = useState(true)

	// if (!isLogin) return <Navigate to="/" />
	return (
		<Box display="flex" justifyContent="center" alignItems="center" p={5}>
			<Card>
				<Box sx={{ p: 4 }} width="550px" height="400px">
					<Card sx={{ width: 1, height: 1, bgcolor: 'black' }}>
						<VideoPlayer
							videoAllowed={videoAllowed}
							// audioAllowed={false}
							width="100%"
							flipX={true}
						/>
					</Card>
				</Box>
				<Box sx={{ p: 4, pt: 0 }}>
					<Grid container justifyContent="center" spacing={1}>
						<Grid item>
							<IconButton onClick={() => setVideoAllowed(!videoAllowed)}>
								{videoAllowed ? <Videocam /> : <VideocamOff />}
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton onClick={() => setAudioAllowed(!audioAllowed)}>
								{audioAllowed ? <Mic /> : <MicOff />}
							</IconButton>
						</Grid>
						<Grid item>
							<LoadingButton variant="outlined">Join Meeting</LoadingButton>
						</Grid>
					</Grid>
				</Box>
			</Card>
		</Box>
	)
}
