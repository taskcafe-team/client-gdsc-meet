import React from 'react'
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Card, Grid, IconButton } from '@mui/material'
import VideoPlayer from './VideoPlayer'

type PreJoinProps = {
	videoAllowed: boolean
	audioAllowed: boolean
	setAudioAllowed: React.Dispatch<React.SetStateAction<boolean>>
	setVideoAllowed: React.Dispatch<React.SetStateAction<boolean>>
	btnJoinMeetingClick: React.MouseEventHandler<HTMLButtonElement>
	isLoading: boolean
}

export default function PreJoin(props: PreJoinProps) {
	return (
		<Card>
			<Box sx={{ p: 3 }} maxWidth="550px" height="400px">
				<Card sx={{ width: 1, height: 1, bgcolor: 'black' }}>
					<VideoPlayer
						videoAllowed={props.videoAllowed}
						flipX={true}
						width="100%"
					/>
				</Card>
			</Box>
			<Box sx={{ p: 3, pt: 0 }}>
				<Grid container justifyContent="center" spacing={1}>
					<Grid item>
						<IconButton
							disabled={props.isLoading}
							onClick={() => props.setVideoAllowed(!props.videoAllowed)}
						>
							{props.videoAllowed ? <Videocam /> : <VideocamOff />}
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							disabled={props.isLoading}
							onClick={() => props.setAudioAllowed(!props.audioAllowed)}
						>
							{props.audioAllowed ? <Mic /> : <MicOff />}
						</IconButton>
					</Grid>
					<Grid item>
						<LoadingButton
							loading={props.isLoading}
							variant="outlined"
							onClick={props.btnJoinMeetingClick}
						>
							Join Meeting
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		</Card>
	)
}
