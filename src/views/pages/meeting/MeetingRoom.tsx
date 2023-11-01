import React from 'react'
import {
	ControlBar,
	GridLayout,
	LiveKitRoom,
	ParticipantTile,
	RoomAudioRenderer,
	useTracks,
} from '@livekit/components-react'
import { Track } from 'livekit-client'
import { Card, Box } from '@mui/material'

type MeetingRoomProps = {
	token: string
}

function MyVideoConference() {
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	)
	return (
		<GridLayout tracks={tracks}>
			<ParticipantTile />
		</GridLayout>
	)
}

export default function MeetingRoom({ token }: MeetingRoomProps) {
	return (
		<Box sx={{ p: 4 }} width="1000px">
			<Card sx={{ width: 1, height: 1 }}>
				<LiveKitRoom
					video={true}
					audio={true}
					token={token}
					connectOptions={{ autoSubscribe: true }}
					serverUrl={'https://gdsc-meet.us.to:7880'}
				>
					<MyVideoConference />
					<RoomAudioRenderer />
					<ControlBar />
				</LiveKitRoom>
			</Card>
		</Box>
	)
}
